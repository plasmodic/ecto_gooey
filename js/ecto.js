// Contains the base of the URL
var EctoBaseUrl = location.href.split('/', 3).join('/');
// dictionary from a module name to the module object
var EctoModules = {};
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

/** A Module is an abstract class containing info about how an ecto module works
 */
function ModuleBase(raw_module) {
    // This is a string
    var current_module = this;
    // Strip out the hierarchy from the module
    this.hierarchy = raw_module.name.split('::');
    this.name = this.hierarchy.pop();

    // This is an associative array where the key is the name of the input\
    this.inputs = {};
    this.outputs = {};
    this.params = {};
    $.each(raw_module.inputs, function(index, input) {
        current_module.inputs[input.name] = input;
    });
    $.each(raw_module.outputs, function(index, output) {
        current_module.outputs[output.name] = output;
    });
    $.each(raw_module.params, function(index, param) {
        current_module.params[param.name] = param;
    });
};

/** A Module is an abstract class containing info about how an ecto module works
 */
function Module(base_module) {
    // This is a string
    var current_module = this;
    this.name = base_module.name;
    this.id = Module.prototype.id;
    ++Module.prototype.id;

    this.hierarchy = 0;
    this.parents = [];
    this.children = [];

    // Copy the inputs/outputs/params
    this.params = base_module.params;
    var module_id = this.id;

    this.io_nodes = {};
    $.each(base_module.inputs, function(index,input) {
        var node = new IoNode(input,1,module_id);
        current_module.io_nodes[node.id] = node;
    });

    $.each(base_module.outputs, function(index,output) {
        var node = new IoNode(output,-1,module_id);
        current_module.io_nodes[node.id] = node;
    });
    
    // Deal with the central node
    this.svg_text = undefined;
    this.svg_ellipse = undefined;
};

/** Function used to display better some memebers in the toString function
 */ 
Module.prototype.toStringHelper = function(input, message) {
    var message = '</br>&nbsp;&nbsp;';
    var module = this;
    for (var member in input) {
        message += member + ': ' + $('<div/>').text(input[member]).html() + ', ';
    }
    return message;
};

/** Display the different members of the Module object
 */ 
Module.prototype.toString = function() {
    var message = '';
    var module = this;
    message += '<div>name: ' + this.name;
    message += '</br>inputs: ';
    $.each(module.inputs, function(key, input) {
        message += module.toStringHelper(input, message);
    });
    message += '</br>outputs: ';
    $.each(module.outputs, function(key, output) {
        message += module.toStringHelper(output, message);
    });
    message += '</br>params: ';
    $.each(module.params, function(key, param) {
        message += module.toStringHelper(param, message);
    });
    message += '</div></br>';
    return message;
};

/** Display the different members of the Module object
 */ 
Module.prototype.UpdateSvg = function(new_svg,tissue,scale,translation_x,translation_y) {
    var ellipse = new_svg.find('ellipse');
    
    // First, make sure the SVG has been created
    if (typeof this.svg_ellipse == "undefined") {
        this.CreateSvg(new_svg,tissue,scale,translation_x,translation_y);
        return;
    }

    // Update the main node ellipse
    var cx = scale*(parseInt(ellipse.attr('cx')) + translation_x),
        cy = scale*(parseInt(ellipse.attr('cy')) + translation_y),
        rx = scale*ellipse.attr('rx'),
        ry = scale*ellipse.attr('ry');
    this.svg_ellipse.animate({cx: cx, cy: cy, rx: rx, ry: ry}, AnimationSlow);

    // Update the main node text
    var text = new_svg.find('text');
    var x = scale*(parseInt(text.attr('x')) + translation_x),
        y = scale*(parseInt(text.attr('y')) + translation_y);
    this.svg_text.animate({x: x, y: y}, AnimationSlow);
    this.svg_text.attr('font-size', Math.max(14,text.attr('font-size')*scale));

    // Update the nodes that belong to links
    var used_io_nodes = [];
    //TODO
    
    // Update the nodes that do not belong to links
    var unused_io_nodes = {};
    $.each(this.io_nodes, function(node_id, node) {
        if (node_id in used_io_nodes)
            return;
        unused_io_nodes[node_id] = node;
    });
    this.UpdateUnusedIoSvg(unused_io_nodes, cx, cy);
};

/** Update th SVG for the nodes that have not been used yet
 */
Module.prototype.UpdateUnusedIoSvg = function(io_nodes, cx, cy) {
    // Count the inputs and outputs
    var n_io = {};
    n_io[-1] = 0;
    n_io[1] = 0;
    $.each(io_nodes, function(node_id, node) {
        n_io[node.io] += 1;
    });

    // Display the different nodes on a circle
    var io_index = {},
        angle_step = {},
        radius = parseFloat(this.svg_ellipse.attr('rx'))/2;
    var offset = 0.5;
    io_index[-1] = offset;
    io_index[1] = offset;
    if (n_io[-1] > 1)
        angle_step[-1] = Math.PI/(n_io[-1]-1+2*offset);
    else
        angle_step[-1] = Math.PI/2/offset;
    if (n_io[1] > 1)
        angle_step[1] = Math.PI/(n_io[1]-1+2*offset);
    else
        angle_step[1] = Math.PI/2/offset;
    $.each(io_nodes, function(node_id, node) {
        var angle = node.io*io_index[node.io]*angle_step[node.io];

        node.svg_circle.animate({cx:cx+radius*Math.cos(angle), cy:cy+radius*Math.sin(angle)}, AnimationSlow);
        io_index[node.io] += 1;
    });
};

/** Create the SVG for a newly initialized module
 */ 
Module.prototype.CreateSvg = function(new_svg,tissue,scale,translation_x,translation_y) {
    var ellipse = new_svg.find('ellipse');
    var AnimationSlow = 600;
    var AnimationFast = 200;

    // Create the main node ellipse
    var cx = scale*(parseInt(ellipse.attr('cx')) + translation_x),
        cy = scale*(parseInt(ellipse.attr('cy')) + translation_y),
        rx = scale*ellipse.attr('rx'),
        ry = scale*ellipse.attr('ry');
    this.svg_ellipse = tissue.raphael.ellipse(cx,cy,rx,ry);
    this.svg_ellipse.attr('opacity',0).animate({opacity: 1}, AnimationSlow);
    
    // Create the IO nodes
    $.each(this.io_nodes, function(node_id, node) {
        node.svg_circle = tissue.raphael.circle(cx,cy,10);
        node.svg_circle.toFront();
        if (node.io == 1)
            node.svg_circle.node.setAttribute("class",'node_input');
        else
            node.svg_circle.node.setAttribute("class",'node_output');
        node.svg_circle.node.id = 'io' + node.id;
        node.svg_circle.attr('opacity',0).animate({opacity: 1}, AnimationSlow);
    });

    // Create the main node text
    var text = new_svg.find('text');
    var x = scale*(parseInt(text.attr('x')) + translation_x),
        y = scale*(parseInt(text.attr('y')) + translation_y);
    this.svg_text = tissue.raphael.text(x,y,text[0].textContent);
    this.svg_text.attr('opacity',0).animate({opacity: 1}, AnimationSlow);
    this.svg_text.attr('font-size', Math.max(14,text.attr('font-size')*scale));
    this.svg_text.toFront();

    this.UpdateUnusedIoSvg(this.io_nodes, cx, cy);
};

Module.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** An IoNode is one of the input/output nodes in the graph for a module
 * io: 1 for input, -1 for output
 * module_id: the id of the module that the node belongs to
 */
function IoNode(node_raw,io,module_id) {
    var current_io_node = this;
    $.each(node_raw, function(key, value) {
        current_io_node[key] = value;
    });
    this.io = io;
    this.id = Node.prototype.id;
    ++Node.prototype.id;
    this.module_id = module_id;
    this.svg_text = undefined;
    this.svg_circle = undefined;
};

Node.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** The class responsible for linking and displaying modules
 */ 
function Tissue() {
    var width = 800,
        height = 600;
    // All the nodes that constitute the tissue
    this.nodes = {};
    this.links = [];

    // The list of modules building the tissue
    this.modules = {};
    // The line that is dragged from one node to the next, if any
    this.current_line = undefined;
    
    this.module_id_to_svg = {};
    this.edge_id_to_svg = {};
    this.raphael = Raphael(200, 0, width, height);
    this.raphael.canvas.setAttribute("id",'tissue');
    this.hovered_text = [];

    var current_tissue = this;
    
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
    $('#tissue .node_input,.node_output').live('mouseout',
        function () {
            $.each(current_tissue.hovered_text, function(index, text) {
                text.animate({opacity:0},AnimationSlow,function() {
                    this.remove();
                });
            });
        });

    // Create a line when you grab an input/output node
    $('#tissue .node_input,.node_output').live('mousedown', function () {
        if (typeof current_tissue.current_line != 'undefined')
            return;
        // Sometimes the line still exists, so don't do anything then
        var index = parseInt($(this).attr('id').substring(2));
        var node = current_tissue.nodes[index];
        var x = parseInt(node.svg_circle.attr('cx')),
            y = parseInt(node.svg_circle.attr('cy'));

        current_tissue.current_line = {};
        current_tissue.current_line.line = current_tissue.raphael.path('M' + x + ' ' + y + 'L' + x + ' ' + y);
        current_tissue.current_line.line.node.setAttribute('id', 'current_link');
        current_tissue.current_line.x = x;
        current_tissue.current_line.y = y;
        current_tissue.current_line.first_node_id = node.id;
        current_tissue.current_line.first_io = node.io;
        current_tissue.current_line.first_module_id = node.module_id;
        current_tissue.current_line.first_type = node.type;
    });

            
    // From now on, when we move the mouse, the line also moves
    $(document).mousemove(function (e) {
        // Only do it if there is a line
        if (typeof current_tissue.current_line == 'undefined')
            return;
        var x2 = e.clientX - parseInt($('#tissue').css('left'));
        var y2 = e.clientY - parseInt($('#tissue').css('top'));
        var x1 = current_tissue.current_line.x, y1 = current_tissue.current_line.y;
        var offset_x, offset_y;
        if (x2>x1)
            offset_x = -1;
        else
            offset_x = 1;
        if (y2>y1)
            offset_y = -1;
        else
            offset_y = 1;
        current_tissue.current_line.line.attr('path', 'M' + x1 + ' ' + y1 + 'L' + (x2 + offset_x) + ' ' + (y2 + offset_y));
    });

    // Finish the line when you release the button over an input/output
    $('#tissue .node_input,.node_output').live('mouseup', function (e) {
        // Only do it if there is a line
        if (typeof current_tissue.current_line == 'undefined')
            return;
        var index = parseInt($(this).attr('id').substring(2));
        var node = current_tissue.nodes[index];
        // Make sure we are linking two different module
        if (node.module_id==current_tissue.current_line.first_module_id)
            return;
        // Make sure we are linking an input and an output
        if (node.io == current_tissue.current_line.first_io)
            return;
        // Make sure the type is the same
        if (node.type!=current_tissue.current_line.first_type)
            return;
        
        // If we passed everything, create a link
        current_tissue.links.push({source: current_tissue.nodes[current_tissue.current_line.first_node_id], target: node});
        var module_input, module_output;
        if (node.type == 1) {
            module_input = current_tissue.modules[node.module_id];
            module_output = current_tissue.modules[current_tissue.current_line.first_module_id];
        } else {
            module_output = current_tissue.modules[node.module_id];
            module_input = current_tissue.modules[current_tissue.current_line.first_module_id];
        }
        module_input.children.push(module_output);
        module_output.parents.push(module_input);
        
        // Update the graphical aspect
        current_tissue.UpdateGraph();
        current_tissue.current_line.line.remove();
        current_tissue.current_line = undefined;
    });

    $('#rectangle_tissue').mouseup(function (e) {
        if (e.target.id == 'rectangle_tissue') {
            if (typeof current_tissue.current_line != 'undefined') {
                current_tissue.current_line.line.remove();
                current_tissue.current_line = undefined;
            }
        }
    });
};

Tissue.prototype.addModule = function(module_name) {
    // Create the newmodule to add to the tissue
    var module = new Module(EctoModules[module_name]);
    var current_tissue = this;
    this.modules[module.id] = module;
    
    // Update all the nodes
    $.each(module.io_nodes, function(node_id, node) {
        current_tissue.nodes[node_id] = node;
    });

    // Redraw everything
    this.UpdateGraph();
}

/** Use graphviz to update the hierarchy of the modules
 */
Tissue.prototype.UpdateGraph = function() {
    // Build the dot formated string that defines the graph
    var dot_graph = 'digraph dot_graph { rankdir=TD; size="8,6";node [shape = circle]; ';
    var current_tissue = this;    
    
    // Add the modules
    var edge_str_to_edge_id = {};
    $.each(this.modules, function(module_id, module) {
        dot_graph += module_id + ' [ label = ' + current_tissue.modules[module_id].name + ' ];';
        //dot_graph += module_id + ' ';
    });
    // Add the module connections
    $.each(this.links, function(link_id, link) {
        if (link.source.module_id != link.target.module_id) {
            dot_graph += link.source.module_id + ' -> ' + link.target.module_id + ' [ arrowhead = none ];';
            edge_str_to_edge_id[link.source.module_id + '->' + link.target.module_id] = link_id;
        }
    });
    dot_graph += '}';

    //
    var module_id_to_svg = {},
        edge_id_to_svg = {};
    var post_answer = $.post(EctoBaseUrl + '/module/graph', {dot_graph: dot_graph}, function(data) {
        data = $(data).find('svg').find('g');
        var scale_regex = /scale\(([.0-9]*)\)/i;
        var scale = parseFloat(data.attr('transform').match(scale_regex)[1]);
        var translation_regex = /translate\(([0-9]*), ([0-9]*)\)/i;

        var translation_x = parseInt(data.attr('transform').match(translation_regex)[1]),
            translation_y = parseInt( data.attr('transform').match(translation_regex)[2]);
        
        // Go over each node/link, and link to the Tissue nodes/links
        $.each($(data), function(index, g_object) {
            if ($(this).attr('class')=='node') {
                module_id_to_svg[parseInt($(this).find('title')[0].textContent)] = $(this);
            } else if ($(this).attr('class')=='edge') {
                edge_id_to_svg[edge_str_to_edge_id[$(this).find('title')[0].textContent]] = $(this);
            }
        });

        // Compare the old nodes to the new ones and update them if they were present
        var node_id_deleted = [];

        $.each(current_tissue.module_id_to_svg, function(node_id, svg) {
            if (node_id in module_id_to_svg) {
                // Update the current SVG of that node
                current_tissue.module_id_to_svg[node_id];
                delete module_id_to_svg[node_id];
            } else {
                node_id_deleted.push(node_id);
            }
        });

        // Compare the old links to the new ones and update them if they were present

        // Add new nodes
        $.each(module_id_to_svg, function(module_id, svg) {
            current_tissue.modules[module_id].UpdateSvg(svg, current_tissue, scale, translation_x, translation_y);
        });

        // Add new links
        
        // Delete old nodes
        
        // Delete old links
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

////////////////////////////////////////////////////////////////////////////////

/** Get the list of modules from the server
 */
function ecto_initialize_modules() {
    $('#modules').html('');

    $.getJSON(EctoBaseUrl + '/module/list', function(data) {
    //$('#modules').append(String(data)).append(String(data["inputs"]));
    $.each(data, function (index, raw_module) {
        var module = new ModuleBase(raw_module);
        // Add the module to the list of modules
        EctoModules[module.name] = module;
        
        // Update the displayed list of modules
        $('#modules').append($('<a></a>')
            .text(module.name)
            .addClass('ecto_module')
            .attr('id', 'ecto_' + module.name)
            .attr('href', 'javascript:void(0)')
            .click(function() {
                MainTissue.addModule(module.name);
            })
        );
        $('#modules').append('</br>');
    });
  });
}

/** Initialize the tissue: where the modules will be displayed and linked
 */
function ecto_initialize_tissue() {
     MainTissue = new Tissue();
}

/** Initialize the page and different structures
 */
function ecto_initialize() {
    ecto_initialize_modules();
    ecto_initialize_tissue();

    //page_resize();
}


// Initialize the data at the beginning
$(document).ready(function() {
  ecto_initialize();
});
