// Contains the base of the URL
var EctoBaseUrl = location.href.split('/', 3).join('/');
// The main tissue on which the modules will be linked
var MainTissue;
var AnimationFast = 200;
var AnimationSlow = 600;

function DebugObject(obj) {
  str='';
  for(prop in obj)
  {
    str+=prop + " value :"+ obj[prop]+"\n";
  }
  return(str);
}

$.fn.listHandlers = function(events, outputFunction) {
    return this.each(function(i){
        var elem = this,
            dEvents = $(this).data('events');
        if (!dEvents) {return;}
        $.each(dEvents, function(name, handler){
            if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
               $.each(handler, function(i,handler){
                   outputFunction(elem, '\n' + i + ': [' + name + '] : ' + handler );
               });
           }
        });
    });
};


////////////////////////////////////////////////////////////////////////////////

function EscapeHtml(input) {
    return escape(input);
}

////////////////////////////////////////////////////////////////////////////////

/** The class responsible for linking and displaying modules
 */ 
function Tissue(tissue_top,tissue_left, tissue_width) {
    var current_tissue = this;
    var tissue_width = 800,
        tissue_height = 600;
    // All the nodes that constitute the tissue
    this.nodes = {};

    // The list of modules building the tissue
    this.modules = {};
    // The line that is dragged from one node to the next, if any
    this.current_edge = undefined;

    this.raphael = Raphael(tissue_left, tissue_top, tissue_width, tissue_height);
    this.raphael.canvas.setAttribute("id",'tissue');
    this.hovered_text = [];
    this.blinking_nodes = {};
    
    // Add the icon for deleting a module
    this.delete_icon = this.raphael.image('image/trash.png', 100, 100, 32, 32);
    this.hovered_module_id = undefined;
    this.delete_icon.attr('opacity',0);
    this.delete_icon.node.setAttribute('class','trash_image');
    this.delete_icon.toFront();
    $(this.delete_icon.node).click(function(e) {
        // When clicking on the icon, delete the module and hide the icon
        current_tissue.deleteModule(current_tissue.hovered_module_id);
        current_tissue.delete_icon.animate({opacity:0}, AnimationFast);
    });

    // Make sure that when you hover the inputs/outputs, you show what they are
    $('#tissue .node_input,.node_output').live('mouseover',
        function () {
            var index = parseInt($(this).attr('id').substring(2));
            var node = current_tissue.nodes[index];
            var x = parseInt(node.svg_circle.attr('cx')),
                y = parseInt(node.svg_circle.attr('cy'));

            var text = current_tissue.raphael.text(x+10,y+10,node.name + ' : ' + node.type);
            text.node.setAttribute('class', 'hovered_text');
            current_tissue.hovered_text.push(text);
        });
    // Delete what an IoNode is when the mouse is not over it
    $('#tissue .node_input,.node_output').live('mouseout', function() {
        current_tissue.HideHoveredText(current_tissue);
    });

    // Create a line when you grab an input/output node
    $('#tissue .node_input,.node_output').live('mousedown', function () {
        if (typeof current_tissue.current_edge != 'undefined')
            return;
        // Sometimes the line still exists, so don't do anything then
        var index = parseInt($(this).attr('id').substring(2));
        var node = current_tissue.nodes[index];
        var x = parseInt(node.svg_circle.attr('cx')),
            y = parseInt(node.svg_circle.attr('cy'));

        current_tissue.current_edge = {};
        current_tissue.current_edge.line = current_tissue.raphael.path('M' + x + ' ' + y + 'L' + x + ' ' + y);
        current_tissue.current_edge.line.node.setAttribute('id', 'current_edge');
        current_tissue.current_edge.x = x;
        current_tissue.current_edge.y = y;
        current_tissue.current_edge.first_node = node;
        
        // Figure out the matching nodes
        $.each(current_tissue.nodes, function(node_id, other_node) {
            // Make sure we are linking two different module
            if (node.module_id == other_node.module_id)
                return;
            // Make sure we are linking an input and an output
            if (node.io == other_node.io)
                return;
            // Make sure the type is the same
            if (node.type != other_node.type)
                return;
            // Store that node
            current_tissue.blinking_nodes[other_node.id] = other_node;
            // Make that node blink
            current_tissue.BlinkNode(other_node);
        });
    });

    // From now on, when we move the mouse, the line also moves
    $(document).mousemove(function (e) {
        // Check if we still need to show the delete_icon
        if ($(e.target).is('.module_center, .trash_image, .module_name')) {
            if ($(e.target).is('.module_center')) {
                // reposition the icon
                current_tissue.hovered_module_id = parseInt(e.target.id.substring(6));
                var module = current_tissue.modules[current_tissue.hovered_module_id];
                current_tissue.delete_icon.attr('x',module.svg_text.svg_text.attr('x')+module.svg_ellipse.attr('rx')-32).attr('y',module.svg_text.svg_text.attr('y')-16);
            }
            current_tissue.delete_icon.animate({'opacity':1}, AnimationFast);
        } else
            current_tissue.delete_icon.animate({'opacity':0}, AnimationFast);
        
        // Only do it if there is a line
        if (typeof current_tissue.current_edge != 'undefined') {
            // Move the potential connection
            var x2 = e.pageX - parseInt($('#tissue').css('left'));
            var y2 = e.pageY - parseInt($('#tissue').css('top'));
            var x1 = current_tissue.current_edge.x, y1 = current_tissue.current_edge.y;
            var offset_x, offset_y;
            if (x2>x1)
                offset_x = -1;
            else
                offset_x = 1;
            if (y2>y1)
                offset_y = -1;
            else
                offset_y = 1;
            current_tissue.current_edge.line.attr('path', 'M' + x1 + ' ' + y1 + 'L' + (x2 + offset_x) + ' ' + (y2 + offset_y));
        };
    });

    // Finish the line when you release the button over an input/output
    $(document).mouseup(function (e) {
        // Only do it if there is a line
        if (typeof current_tissue.current_edge == 'undefined')
            return;
        var is_io = false;
        var classes = $(e.target).attr('class');
        // Check if we landed on a node_input/node_output
        if (typeof classes != 'undefined') {
            $.each(classes.split(/\s+/), function(key, class_name) {
                if ((class_name=='node_input') || (class_name=='node_output')) {
                    is_io = true;
                    return false;
                }
            });
        }

        // If we landed on an IoNode, check if it is a valid connection
        if (is_io) {
            var index = parseInt(e.target.id.substring(2));
            var node = current_tissue.nodes[index];
            // Check if that node is a potential target
            if (!(node.id in current_tissue.blinking_nodes))
                return;

            // Make sure that the input is not linked to an output already
            var target_node;
            if (node.io == 1)
                target_node = node;
            else
                target_node = current_tissue.current_edge.first_node;
            if (! $.isEmptyObject(target_node.edges))
                return false;

            // If we passed everything, create an edge
            var edge = new IoEdge(current_tissue.current_edge.first_node, node)

            // Update the graphical aspect
            current_tissue.updateGraph();
        }

        // Delete the line
        current_tissue.current_edge.line.remove();
        current_tissue.current_edge = undefined;
        
        // Have the blinking nodes stop blinking
        $.each(current_tissue.blinking_nodes, function(node_id, node) {
            node.svg_circle.stop();
            node.svg_circle.attr('opacity',1);
        });
        current_tissue.blinking_nodes = {};
    });
};

Tissue.prototype.addModule = function(module_name) {
    // Create the newmodule to add to the tissue
    var module = new Module(EctoModules[module_name], this);
    var current_tissue = this;
    this.modules[module.id] = module;
    
    // Update all the nodes
    $.each(module.io_nodes, function(node_id, node) {
        current_tissue.nodes[node_id] = node;
    });

    // Redraw everything
    this.updateGraph();
}

Tissue.prototype.deleteModule = function(module_id) {
    // Delete the module
    this.modules[module_id].delete();

    // Hide the delete icon
    current_tissue.delete_icon.animate({'opacity':0}, AnimationFast);

    // Redraw everything
    this.updateGraph();
}

Tissue.prototype.BlinkNode = function(node) {
    // Have the node blink
    var current_tissue = this;
    node.svg_circle.attr('opacity',1);
    node.svg_circle.animate({opacity:0}, 500, function() {
        node.svg_circle.animate({opacity:1}, 500, function() {
            current_tissue.BlinkNode(node);
        });
    });
}

/** Use graphviz to update the hierarchy of the modules
 */
Tissue.prototype.updateGraph = function() {
    // Build the dot formated string that defines the graph
    var dot_graph = 'digraph dot_graph { rankdir=TD; size="8,6";node [shape = circle]; ';
    var current_tissue = this;

    // Add the modules
    $.each(this.modules, function(module_id, module) {
        dot_graph += module_id + ' [ label = ' + current_tissue.modules[module_id].name + ' ];';
        //dot_graph += module_id + ' ';
    });
    // Add the module edges
    var edge_str_to_edge = {};
    $.each(this.nodes, function(node_id, node) {
        $.each(node.edges, function(edge_id, edge) {
            var sametail = edge.source.module_id + edge.source.name,
                samehead = edge.target.module_id + edge.target.name;
            var edge_label = samehead + '_' + sametail;
            edge_str_to_edge[edge_label] = edge;
        });
    });
     
    $.each(edge_str_to_edge, function(edge_label, edge) {
         var sametail = edge.source.module_id + edge.source.name,
                samehead = edge.target.module_id + edge.target.name;
        dot_graph += edge.source.module_id + ' -> ' + edge.target.module_id + ' [ arrowhead = "none", label = "' + edge_label + '",  headlabel = "' + edge.source.name + '", taillabel = "' + edge.target.name + '", samehead = "' + samehead + '", sametail = "' + sametail + '" ];';
    });
    dot_graph += '}';

    // Ask the web server to build a new layout
    var post_answer = $.post(EctoBaseUrl + '/module/graph', {dot_graph: dot_graph}, function(data) {
        data = $(data).find('svg').find('g');
        var scale_regex = /scale\(([.0-9]*) *([.0-9]*)\)/i;
        var scale = parseFloat(data.attr('transform').match(scale_regex)[1]);
        var translation_regex = /translate\(([0-9]*),* ([0-9]*)\)/i;

        var translation_x = parseInt(data.attr('transform').match(translation_regex)[1]),
            translation_y = parseInt( data.attr('transform').match(translation_regex)[2]);

        // Go over each node/edge, and edge to the Tissue nodes/edges
        var edge_id_to_svg = {};
        $.each($(data), function(index, g_object) {
            if ($(this).attr('class')=='node') {
                var module_id = parseInt($(this).find('title')[0].textContent);
                // Update the SVG of the module
                current_tissue.modules[module_id].svgUpdate($(this), current_tissue, scale, translation_x, translation_y);
            } else if ($(this).attr('class')=='edge') {
                $.each($(this).find('text'), function(text_index, text_obj) {
                    if (text_obj.textContent in edge_str_to_edge) {
                        edge_str_to_edge[text_obj.textContent].svgUpdate($(g_object), current_tissue, scale, translation_x, translation_y);
                        return false;
                    }
                });
            }
        });
    }, 'xml')
    .error(function(x,e){
            if(x.status==0){
            alert('You are offline!!\n Please Check Your Network.');
            }else if(x.status==404){
            alert('Requested URL not found.');
            }else if(x.status==500){
            alert('Internel Server Error.');
            }else if(e=='parsererror'){
            alert('Error.\nParsing JSON Request failed.');
            }else if(e=='timeout'){
            alert('Request Time out.');
            }else {
            alert('An error happened: ' + e + ' with status ' + x.status + '.\n'+x.responseText);
            }});
}

Tissue.prototype.HideHoveredText = function (current_tissue) {
    $.each(current_tissue.hovered_text, function(index, text) {
        text.animate({opacity:0},AnimationSlow,function() {
            this.remove();
        });
    });
    /*var new_hovered_text = [];
    $.each(current_tissue.hovered_text, function(index, text) {
        if (!text.removed)
            new_hovered_text.push(text);
    });
    current_tissue.hovered_text = new_hovered_text;*/
};

////////////////////////////////////////////////////////////////////////////////

/** Initialize the tissue: where the modules will be displayed and linked
 */
function EctoInitializeTissue(top, left) {
     MainTissue = new Tissue(top, left);
}

/** Initialize the page and different structures
 */
function ecto_initialize() {
    EctoInitializeModules();
    var top = 10,
        tissue_left = 200,
        tissue_width = 600,
        param_width = 100;
    EctoInitializeTissue(top, tissue_left, tissue_width);
    EctoInitializeParameters(top,tissue_left+tissue_width, param_width);

    //page_resize();
}

////////////////////////////////////////////////////////////////////////////////

// Initialize the data at the beginning
$(document).ready(function() {
    $.getScript(EctoBaseUrl + '/js/ecto/module.js', function() {
        ecto_initialize();
    }).error(function(x,e){
            if(x.status==0){
            alert('You are offline!!\n Please Check Your Network.');
            }else if(x.status==404){
            alert('Requested URL not found.');
            }else if(x.status==500){
            alert('Internel Server Error.');
            }else if(e=='parsererror'){
            alert('Error.\nParsing JSON Request failed.');
            }else if(e=='timeout'){
            alert('Request Time out.');
            }else {
            alert('An error happened: ' + e + ' with status ' + x.status + '.\n'+x.responseText);
            }});
});
