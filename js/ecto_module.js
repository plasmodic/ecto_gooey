// Contains the base of the URL
var EctoBaseUrl = location.href.split('/', 3).join('/');
// dictionary from a module name to the module object
var EctoModules = {};
var AnimationFast = 200;
var AnimationSlow = 600;

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
Module.prototype.svgUpdate = function(new_svg,tissue,scale,translation_x,translation_y) {
    var ellipse = new_svg.find('ellipse');
    
    // First, make sure the SVG has been created
    if (typeof this.svg_ellipse == "undefined") {
        this.svgCreate(new_svg,tissue,scale,translation_x,translation_y);
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

    // Update the nodes that do not belong to links
    var unused_io_nodes = {};
    $.each(this.io_nodes, function(node_id, node) {
        if ($.isEmptyObject(node.edges))
            unused_io_nodes[node_id] = node;
    });
    this.svgUpdateUnusedIo(unused_io_nodes, cx, cy);
};

/** Update the SVG for the nodes that have not been used yet
 */
Module.prototype.svgUpdateUnusedIo = function(io_nodes, cx, cy) {
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
        var angle = -node.io*io_index[node.io]*angle_step[node.io];

        node.svg_circle.animate({cx:cx+radius*Math.cos(angle), cy:cy+radius*Math.sin(angle)}, AnimationSlow);
        io_index[node.io] += 1;
    });
};

/** Create the SVG for a newly initialized module
 */ 
Module.prototype.svgCreate = function(new_svg,tissue,scale,translation_x,translation_y) {
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

    this.svgUpdateUnusedIo(this.io_nodes, cx, cy);
};

Module.prototype.svgDelete = function() {
    $.each(module.io_nodes, function(node_id, node) {
        node.svgDelete();
    });
    this.svg_text.animate({'opacity':0}, AnimationFast).remove();
    this.svg_ellipse.animate({'opacity':0}, AnimationFast).remove();
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
    this.id = IoNode.prototype.id;
    ++IoNode.prototype.id;
    // Contains IoEdge's;
    this.edges = {};
    this.module_id = module_id;
    this.svg_text = undefined;
    this.svg_circle = undefined;
};

IoNode.prototype.svgDelete = function() {
    $.each(this.edges, function(edge_id, edge) {
        edge.svgDelete();
    });
    this.svg_text.animate({'opacity':0}, AnimationFast).remove();
    this.svg_circle.animate({'opacity':0}, AnimationFast).remove();
};

IoNode.prototype.svgUpdate = function(x,y) {
    console.info(this.svg_circle);
    //TODO
    //if (typeof console.info(this.svg_text) != 'undefined')
      //  this.svg_text.animate({'x':x, 'y':y}, AnimationSlow);
    this.svg_circle.animate({'cx':x, 'cy':y}, AnimationSlow);
};

IoNode.prototype.x = function() {
    return parseInt(this.svg_circle.attr('cx'));
};

IoNode.prototype.y = function() {
    return parseInt(this.svg_circle.attr('cy'));
};

IoNode.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** An IoEdge is an edge connecting two IoNode's from different modules
 */
function IoEdge(node_1,node_2) {
    if (node_1.io==1) {
        this.source = node_2;
        this.target = node_1;
    } else {
        this.source = node_1;
        this.target = node_2;
    }

    this.id = IoEdge.prototype.id;
    ++IoEdge.prototype.id;
    this.svg_text_source = undefined;
    this.svg_text_target = undefined;
    this.svg_path = undefined;

    // update the corresponding nodes
    this.source.edges[this.id] = this;
    this.target.edges[this.id] = this;
};

IoEdge.prototype.svgDelete = function() {
    this.svg_text_source.animate({'opacity':0}, AnimationFast).remove();
    this.svg_text_target.animate({'opacity':0}, AnimationFast).remove();
    this.svg_path.animate({'opacity':0}, AnimationFast).remove();
};

IoEdge.prototype.svgUpdate = function(new_svg,tissue,scale,translation_x,translation_y) {
    // Create a bogus path that is at the final position
    var path = tissue.raphael.path(new_svg.find('path').attr('d'));
    path.attr('opacity',0);
    path.translate(translation_x,translation_y);
    path.scale(scale,scale,0,0);
    
    // Deal with the nodes
    var point_source = path.getPointAtLength(0),
        point_target = path.getPointAtLength(path.pathLength);
        console.info('x:' + point_source.x);
    this.source.svgUpdate(point_source.x, point_source.y);
    this.target.svgUpdate(point_target.x, point_target.y);
    
    // Deal with the path
    if (typeof this.svg_path == 'undefined') {
      // add a new path
        this.svg_path = tissue.raphael.path('M' + this.source.x() + ' ' + this.source.y() + 'L' + this.target.x() + ' ' + this.target.y());
        this.svg_path.toBack();
    }
    // morph the old path
    this.svg_path.animate({'path': path.attr('path'), 'opacity': 1}, AnimationSlow, function() {
        path.remove();
    });
};

IoEdge.prototype.id = 0;

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
};
