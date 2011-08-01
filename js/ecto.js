// A lot on that page is inspired by 
// http://bl.ocks.org/929623

// Contains the base of the URL
var EctoBaseUrl = location.href.split('/', 3).join('/');
// dictionary from a module name to the module object
var EctoModules = {};
// The main tissue on which the modules will be linked
var MainTissue;

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
function Module(base_module, is_generic) {
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
        var node = new Node(input,1,module_id);
        current_module.io_nodes[node.id] = node;
    });

    $.each(base_module.outputs, function(index,output) {
        var node = new Node(output,-1,module_id);
        current_module.io_nodes[node.id] = node;
    });
    
    // Deal with the central node
    var node = new Node({name:this.name},0,module_id);
    this.main_node = node;
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
    var speed_slow = 600;
    var speed_fast = 200;
    
    // First, make sure the SVG has been created
    if (typeof this.main_node.svg_circle == "undefined") {
        this.CreateSvg(new_svg,tissue,scale,translation_x,translation_y);
        return;
    }

    // Update the main node ellipse
    var cx = scale*(parseInt(ellipse.attr('cx')) + translation_x),
        cy = scale*(parseInt(ellipse.attr('cy')) + translation_y),
        rx = scale*ellipse.attr('rx'),
        ry = scale*ellipse.attr('ry');
    this.main_node.svg_circle.animate({cx: cx, cy: cy, rx: rx, ry: ry}, speed_slow);

    // Update the main node text
    var text = new_svg.find('text');
    var x = scale*(parseInt(text.attr('x')) + translation_x),
        y = scale*(parseInt(text.attr('y')) + translation_y);
    this.main_node.svg_text.animate({x: x, y: y}, speed_slow);
    this.main_node.svg_text.attr('font-size', Math.max(14,text.attr('font-size')*scale));

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
    var speed_slow = 600;
    var speed_fast = 200;

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
        radius = parseFloat(this.main_node.svg_circle.attr('rx'))/2;
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

        node.svg_circle.animate({cx:cx+radius*Math.cos(angle), cy:cy+radius*Math.sin(angle)}, speed_slow);
        io_index[node.io] += 1;
    });
};

/** Create the SVG for a newly initialized module
 */ 
Module.prototype.CreateSvg = function(new_svg,tissue,scale,translation_x,translation_y) {
    var ellipse = new_svg.find('ellipse');
    var speed_slow = 600;
    var speed_fast = 200;

    // Create the main node ellipse
    var cx = scale*(parseInt(ellipse.attr('cx')) + translation_x),
        cy = scale*(parseInt(ellipse.attr('cy')) + translation_y),
        rx = scale*ellipse.attr('rx'),
        ry = scale*ellipse.attr('ry');
    this.main_node.svg_circle = tissue.raphael.ellipse(cx,cy,rx,ry);
    this.main_node.svg_circle.attr('opacity',0).animate({opacity: 1}, speed_slow);
    
    // Create the IO nodes
    $.each(this.io_nodes, function(node_id, node) {
        node.svg_circle = tissue.raphael.circle(cx,cy,10);
        node.svg_circle.toFront();
        if (node.io == 1)
            node.svg_circle.node.setAttribute("class",'node_input');
        else
            node.svg_circle.node.setAttribute("class",'node_output');
        node.svg_circle.node.id = 'io' + node.id;
        node.svg_circle.attr('opacity',0).animate({opacity: 1}, speed_slow);
    });

    // Create the main node text
    var text = new_svg.find('text');
    var x = scale*(parseInt(text.attr('x')) + translation_x),
        y = scale*(parseInt(text.attr('y')) + translation_y);
    this.main_node.svg_text = tissue.raphael.text(x,y,text[0].textContent);
    this.main_node.svg_text.attr('opacity',0).animate({opacity: 1}, speed_slow);
    this.main_node.svg_text.attr('font-size', Math.max(14,text.attr('font-size')*scale));
    this.main_node.svg_text.toFront();

    this.UpdateUnusedIoSvg(this.io_nodes, cx, cy);
};

Module.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** A Node is one of the nodes in the graph
 * io: 0 for center, 1 for input, -1 for output
 * module_id: the id of the module that the node belongs to
 */
function Node(node_raw,io,module_id) {
    $.each(node_raw, function(key, value) {
        this[key] = value;
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
    this.nodes = [];
    this.links = [];

    // The list of modules building the tissue
    this.modules = {};
    // The line that is dragged from one node to the next, if any
    this.current_line = {'is_alive':false, 'first_type':false, 'first_module_id':0, 'first_module_id': 0, 'first_node_id':0};
    
    this.module_id_to_svg = {};
    this.edge_id_to_svg = {};
    this.raphael = Raphael(200, 0, width, height);
    this.raphael.canvas.setAttribute("class",'tissue');

    var current_tissue = this;    
    
    // Make sure that when you hover the inputs/outputs, you show what they are
    $('#tissue .node_input,.node_output').live('mouseover',
        function () {
            var index = parseInt($(this).attr('id').substring(5));
            var node = current_tissue.nodes[index];
            var x = node.x, y = node.y;

            $('#tissue .hovered_text').remove();
            $('#tissue').append("svg:text")
                .text(node.name + ' : ' + node.var_type)
                .attr("x",x + 10)
                .attr("y",y - 10)
                .attr('class', 'hovered_text');
        });
    $('#tissue .node_input').live('mouseout',
        function () {
            $('#tissue .hovered_text').fadeOut('slow');
        });

    // Create a line when you grab an input/output node
    $('#tissue .node_input,.node_output').live('mousedown', function () {
        // Sometimes the line still exists, so don't do anything then
        if (!current_tissue.current_line.is_alive) {
            var index = parseInt($(this).attr('id').substring(5));
            var node = current_tissue.nodes[index];
            var x = node.x, y = node.y;

            $('#tissue').append("svg:line")
                .attr("x1",x)
                .attr("y1",y)
                .attr("x2",x)
                .attr("y2",y)
                .attr('id', 'current_link');
            current_tissue.current_line.is_alive = true;
            current_tissue.current_line.first_node_id = node.id;
            current_tissue.current_line.first_type = node.type;
            current_tissue.current_line.first_module_id = node.module_id;
            current_tissue.current_line.first_var_type = node.var_type;
        };
    });

    // Finish the line when you release the button over an input/output
    $('#tissue .node_input,.node_output').live('mouseup', function (e) {
        // Only do it if there is a line
        if (current_tissue.current_line.is_alive) {
            var index = parseInt($(this).attr('id').substring(2));
            var node = current_tissue.nodes[index];
            // Make sure we are linking two different module
            if (node.module_id==current_tissue.current_line.first_module_id)
                return;
            // Make sure we are linking an input and an output
            if (node.type == current_tissue.current_line.first_type)
                return;
            // Make sure the type is the same
            if (node.var_type!=current_tissue.current_line.first_var_type)
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
            current_tissue.UpdateHierarchy();
            
            // Update the graphical aspect
            current_tissue.UpdateLinks('external_link');
            current_tissue.current_line.is_alive = false;
            $('#tissue #current_link').remove();
        };
    });

    $('#rectangle_tissue').mouseup(function (e) {
        if (e.target.id == 'rectangle_tissue') {
            if (current_tissue.current_line.is_alive) {
                current_tissue.current_line.is_alive = false;
                $('#tissue #current_link').remove();
            }
        }
    });

    $(document).mousemove(function (e) {
        if (current_tissue.current_line.is_alive) {
            var x2 = e.clientX - parseInt($('#tissue').css('left'));
            var y2 = e.clientY - parseInt($('#tissue').css('top'));
            var x1 = $('#current_link').attr("x1"), y1 = $('#current_link').attr("y1");
            var offset_x, offset_y;
            if (x2>x1)
                offset_x = -1;
            else
                offset_x = 1;
            if (y2>y1)
                offset_y = -1;
            else
                offset_y = 1;
            $('#current_link').attr("x2",x2 + offset_x).attr("y2",y2 + offset_y);
        }
    });
};

Tissue.prototype.addModule = function(module_name) {
    // Create the newmodule to add to the tissue
    var module = new Module(EctoModules[module_name]);
    var current_tissue = this;
    this.modules[module.id] = module;

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
