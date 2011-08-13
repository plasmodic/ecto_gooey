// dictionary from a cell name to the cell object
var EctoCells = {};

////////////////////////////////////////////////////////////////////////////////

/** Function to make text unelectable */
$.fn.extend({disableSelection: function() {
    this.each(function() {
        if (typeof this.onselectstart != 'undefined') {
            this.onselectstart = function() { return false; };
        } else if (typeof this.style.MozUserSelect != 'undefined') {
            this.style.MozUserSelect = 'none';
        } else {
            this.onmousedown = function() { return false; };
        }
    });
}});

////////////////////////////////////////////////////////////////////////////////

/** A Cell is an abstract class containing info about how an ecto cell works
 */
function CellBase(raw_cell) {
    // This is a string
    var current_cell = this;
    // Strip out the hierarchy from the cell
    this.hierarchy = raw_cell.hierarchy;
    // Remove :: as that can be problematic for graphviz
    var hierarchy = raw_cell.name.split('::');
    this.name = hierarchy.pop();

    // This is an associative array where the key is the name of the input\
    this.inputs = {};
    this.outputs = {};
    this.params = {};
    $.each(raw_cell.inputs, function(index, input) {
        current_cell.inputs[input.name] = input;
    });
    $.each(raw_cell.outputs, function(index, output) {
        current_cell.outputs[output.name] = output;
    });
    $.each(raw_cell.params, function(index, param) {
        param.value = undefined;
        current_cell.params[param.name] = param;
    });
};

/** A Cell is an abstract class containing info about how an ecto cell works
 */
function Cell(base_cell, tissue) {
    // This is a string
    var current_cell = this;
    this.hierarchy = base_cell.hierarchy;
    this.name = base_cell.name;
    this.id = Cell.prototype.id;
    this.tissue = tissue;
    ++Cell.prototype.id;

    // Copy the inputs/outputs/params
    this.params = base_cell.params;
    var cell_id = this.id;

    this.io_nodes = {};
    $.each(base_cell.inputs, function(index,input) {
        var node = new IoNode(input,1,cell_id,tissue);
        current_cell.io_nodes[node.id] = node;
    });

    $.each(base_cell.outputs, function(index,output) {
        var node = new IoNode(output,-1,cell_id,tissue);
        current_cell.io_nodes[node.id] = node;
    });

    // Create the main node ellipse
    var width = tissue.raphael.width,
        height = tissue.raphael.height;

    this.svg_ellipse = tissue.raphael.ellipse(Math.random()*width/2,Math.random()*height/2,Math.random()*width,Math.random()*height);
    this.svg_ellipse.toBack();
    this.svg_ellipse.node.setAttribute('class', 'cell_center');
    this.svg_ellipse.node.id = 'cell' + this.id;

    // Create the main node text
    this.svg_text = new CellName(this.name,tissue);
    
    // When we click one or the other, the displayed parameters should change
    $($(this.svg_ellipse.node)).add($(this.svg_text.svg_text.node)).click(function(e) {
        DisplayParameters(current_cell, current_cell.params);
    });
};

/** Function used to display better some members in the toString function
 */ 
Cell.prototype.toStringHelper = function(input, message) {
    var message = '</br>&nbsp;&nbsp;';
    var cell = this;
    for (var member in input) {
        message += member + ': ' + $('<div/>').text(input[member]).html() + ', ';
    }
    return message;
};

/** Display the different members of the Cell object
 */ 
Cell.prototype.toString = function() {
    var message = '';
    var cell = this;
    message += '<div>name: ' + this.name;
    message += '</br>inputs: ';
    $.each(cell.inputs, function(key, input) {
        message += cell.toStringHelper(input, message);
    });
    message += '</br>outputs: ';
    $.each(cell.outputs, function(key, output) {
        message += cell.toStringHelper(output, message);
    });
    message += '</br>params: ';
    $.each(cell.params, function(key, param) {
        message += cell.toStringHelper(param, message);
    });
    message += '</div></br>';
    return message;
};

/** Display the different members of the Cell object
 */ 
Cell.prototype.svgUpdate =
function(new_svg,tissue,scale,translation_x,translation_y) {
    var ellipse = new_svg.find('ellipse');

    // Update the main node ellipse
    var cx = scale*(parseInt(ellipse.attr('cx')) + translation_x),
        cy = scale*(parseInt(ellipse.attr('cy')) + translation_y),
        rx = scale*ellipse.attr('rx'),
        ry = scale*ellipse.attr('ry');
    this.svg_ellipse.animate({cx: cx, cy: cy, rx: rx, ry: ry}, AnimationSlow);

    // Update the main node text
    this.svg_text.svgUpdate(new_svg,scale,translation_x,translation_y);

    // Update the nodes that do not belong to links
    var unused_io_nodes = {};
    $.each(this.io_nodes, function(node_id, node) {
        if ($.isEmptyObject(node.edges))
            unused_io_nodes[node_id] = node;
    });
    this.svgUpdateUnusedIo(unused_io_nodes, cx, cy, rx, ry);
};

/** Update the SVG for the nodes that have not been used yet
 */
Cell.prototype.svgUpdateUnusedIo = function(io_nodes, cx, cy, rx, ry) {
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
        radius = rx/2;
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

Cell.prototype.delete = function() {
    // Delete the nodes
    $.each(this.io_nodes, function(node_id, node) {
        node.delete();
    });

    // Delete the SVG
    this.svg_text.svgDelete();
    this.svg_ellipse.animate({'opacity':0}, AnimationFast).remove();

    // Delete it the cells from the database of cells
    delete this.tissue.cells[this.id];
};

Cell.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** An IoNode is one of the input/output nodes in the graph for a cell
 * io: 1 for input, -1 for output
 * cell_id: the id of the cell that the node belongs to
 */
function IoNode(node_raw,io,cell_id,tissue) {
    var current_io_node = this;
    $.each(node_raw, function(key, value) {
        current_io_node[key] = value;
    });
    this.type = CleanType(this.type);
    this.io = io;
    this.id = IoNode.prototype.id;
    ++IoNode.prototype.id;
    // Contains IoEdge's;
    this.edges = {};
    this.cell_id = cell_id;
    this.tissue = tissue;

    // Create the text
    this.svg_text = undefined;
    
    // Create the circle
    this.svg_circle = tissue.raphael.circle(Math.random()*tissue.width,Math.random()*tissue.height,10);
    this.svg_circle.toFront();
    if (this.io == 1)
        this.svg_circle.node.setAttribute("class",'node_input');
    else
        this.svg_circle.node.setAttribute("class",'node_output');
    this.svg_circle.node.id = 'io' + this.id;
};

IoNode.prototype.delete = function() {
    // Delete the edges
    $.each(this.edges, function(edge_id, edge) {
        edge.delete();
    });
    
    //TODO
    //if (typeof this.svg_text != 'undefined')
//    this.svg_text.animate({'opacity':0}, AnimationFast).remove();
    
    // Delete the SVG
    this.svg_circle.animate({'opacity':0}, AnimationFast).remove();
    
    // Delete it from the list of Nodes
    delete this.tissue.nodes[this.id];
};

IoNode.prototype.svgUpdate = function(x,y) {
    //TODO
    //if (typeof this.svg_text != 'undefined')
      //  this.svg_text.animate({'x':x, 'y':y}, AnimationSlow);
    this.svg_circle.animate({'cx':x, 'cy':y, 'opacity':1}, AnimationSlow);
    this.svg_circle.toFront();
};

IoNode.prototype.x = function() {
    return parseInt(this.svg_circle.attr('cx'));
};

IoNode.prototype.y = function() {
    return parseInt(this.svg_circle.attr('cy'));
};

IoNode.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** An IoEdge is an edge connecting two IoNode's from different cells
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

IoEdge.prototype.delete = function() {
    delete this.source.edges[this.id];
    delete this.target.edges[this.id];
    
    //TODO
    //this.svg_text_source.animate({'opacity':0}, AnimationFast).remove();
    //this.svg_text_target.animate({'opacity':0}, AnimationFast).remove();
    
    // Delete the SVG
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

function CellName(text,tissue) {
    var width = tissue.raphael.width,
        height = tissue.raphael.height;
    // Create the main node text
    this.svg_text = tissue.raphael.text(Math.random()*width,Math.random()*height,text);
    this.svg_text.attr('opacity',0);
    this.svg_text.node.setAttribute('class', 'cell_name');
    $(this.svg_text.node).children().attr('class', 'cell_name');
    // Make sure it appears above the rest
    this.svg_text.toFront();
    // Make sure it does not get selected when dragging the mouse
    $(this.svg_text.node).disableSelection();
    $(this.svg_text.node).attr('pointer-events', 'none');
    $(this.svg_text.node).children().attr('pointer-events', 'none');
};

CellName.prototype.svgDelete = function() {
    this.svg_text.animate({'opacity':0}, AnimationFast).remove();
}

CellName.prototype.svgUpdate =
function(new_svg,scale,translation_x,translation_y) {
    var text = new_svg.find('text');
    var x = scale*(parseInt(text.attr('x')) + translation_x),
        y = scale*(parseInt(text.attr('y')) + translation_y);
    this.svg_text.animate({x: x, y: y, opacity:1}, AnimationSlow);
    this.svg_text.attr('font-size', Math.max(14,text.attr('font-size')*scale));
    this.svg_text.attr('text', new_svg.find('text').text(0).textContent);
}

////////////////////////////////////////////////////////////////////////////////

/** Get the list of cells from the server and display them as a tree
 */
function EctoInitializeCells(top, width) {
    $('#cell_tree').html('');

    $.getJSON(EctoBaseUrl + '/cell/list', function(data) {
        //$('#cells').append(String(data)).append(String(data["inputs"]));
        // First, separate the cells according to their namespaces
        var main_level = {cells: [], sub_levels: {}};
        $.each(data, function (index, raw_cell) {
            var current_level = main_level;
            $.each(raw_cell.hierarchy, function (index, sub_hierarchy) {
                if (!(sub_hierarchy in current_level.sub_levels)) {
                    current_level.sub_levels[sub_hierarchy] = {cells: [],
                        sub_levels: {}};
                }
                current_level = current_level.sub_levels[sub_hierarchy];
            });
            current_level.cells.push(raw_cell);
        });
        // Process each level and put it in a tree view
        AddCellToTree($('#cell_tree'), 'opencv', main_level);
        $('#cell_tree').jstree({"plugins": ["ui", "themes", "search",
                               "html_data"], "themes": {"theme":"apple",
                               "dots":true, "icons":false},"search":
                               {"show_only_matches":true}
                               }).bind("select_node.jstree", function(e, data) {
                                   // Make sure clicking on a node opens the
                                   //tree
                               $('#cell_tree').jstree("toggle_node",
                                                      data.rslt.obj);
                               });
    });

    $('#cell_tree').css({'position': 'absolute', 'top': top, 'width': width});
};

function AddCellToTree(tree, name, level) {
    // First add each subtree
    tree.append($('<a></a>')
            .text(name)
            .attr('href', 'javascript:void(0)'));
    var sub_tree = $('<ul/>');
    if (!$.isEmptyObject(level.sub_levels)) {
        $.each(level.sub_levels, function (sub_level_name, sub_level) {
            var sub_sub_tree = $('<li/>');
            AddCellToTree(sub_sub_tree, sub_level_name, sub_level);
            sub_tree.append(sub_sub_tree);
        });
    }

    // Then add each cell
    $.each(level.cells, function (index, raw_cell) {
        var cell = new CellBase(raw_cell);
        // Add the cell to the list of cells
        EctoCells[cell.name] = cell;
        var a = $('<li><a></a></li>');
        a.children('a')
            .text(cell.name)
            .addClass('ecto_cell')
            .attr('id', 'ecto_' + cell.name)
            .attr('href', 'javascript:void(0)')
            .click(function() {
                MainTissue.AddCell(cell.name);
            });
        sub_tree.append(a);
    });
    tree.append(sub_tree);
};
