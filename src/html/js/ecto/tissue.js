// Details the class containing info about the graph and its connections to the
// GUI

////////////////////////////////////////////////////////////////////////////////

/** The class responsible for linking and displaying cells
 */ 
function Tissue(tissue_top,tissue_left, tissue_width, tissue_height) {
    var current_tissue = this;
    this.Clear();

    this.raphael = Raphael('main_div', tissue_width, tissue_height);
    $(this.raphael.canvas).attr('id','tissue').css({'position':'absolute', 'left':tissue_left, 'top': tissue_top});
    
    // Add the icon for deleting a cell
    this.delete_icon = new DeleteIcon(this.raphael);

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
        current_tissue.current_edge.line = current_tissue.raphael.path('M' + x +
            ' ' + y + 'L' + x + ' ' + y);
        current_tissue.current_edge.line.node.setAttribute('id', 'current_edge');
        current_tissue.current_edge.x = x;
        current_tissue.current_edge.y = y;
        current_tissue.current_edge.first_node = node;
        
        // Figure out the matching nodes
        $.each(current_tissue.nodes, function(node_id, other_node) {
            // Make sure we are linking two different cells
            if (node.cell_id == other_node.cell_id)
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
        if ($(e.target).is('.cell_center, .trash_image, .cell_name')) {
            if ($(e.target).is('.cell_center')) {
                // reposition the icon
                var hovered_cell_id =
                    parseInt(e.target.id.substring(4));
                var cell = current_tissue.cells[hovered_cell_id];
                current_tissue.delete_icon.Update('cell', hovered_cell_id,
                    cell.svg_text.svg_text.attr('x')+
                    cell.svg_ellipse.attr('rx')-16,
                    cell.svg_text.svg_text.attr('y'));
            } else
                current_tissue.delete_icon.Show();
        } else if ($(e.target).is('.io_edge')) {
            var hovered_io_edge_id =
                    parseInt(e.target.id.substring(7));
            var mid_point = IoEdgeIdToIoEdge(hovered_io_edge_id).MidPoint();
            current_tissue.delete_icon.Update('io_edge', hovered_io_edge_id,
                mid_point.x, mid_point.y);
        } else
            current_tissue.delete_icon.Hide();
        
        // Only do it if there is a line
        if (typeof current_tissue.current_edge != 'undefined') {
            // Move the potential connection
            var x2 = e.pageX - parseInt($('#tissue').offset().left);
            var y2 = e.pageY - parseInt($('#tissue').offset().top);
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
            current_tissue.current_edge.line.attr('path', 'M' + x1 + ' ' + y1 +
                'L' + (x2 + offset_x) + ' ' + (y2 + offset_y));
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
            current_tissue.UpdateGraph();
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

////////////////////////////////////////////////////////////////////////////////

Tissue.prototype.Clear = function() {
    // All the nodes that constitute the tissue
    this.nodes = {};
    // The list of cells building the tissue. Key:id, value: the cell
    this.cells = {};
    // The cell that has un-filled required parameters
    this.invalid_cell = undefined;
    // The line that is dragged from one node to the next, if any
    this.current_edge = undefined;
    this.blinking_nodes = {};
}

////////////////////////////////////////////////////////////////////////////////

Tissue.prototype.AddCell = function(cell_name) {
    // Create the new cell to add to the tissue
    var cell = new Cell(EctoCells[cell_name], this, 0);
    var current_tissue = this;
    this.cells[cell.id] = cell;

    // Update all the nodes
    $.each(cell.io_nodes, function(node_id, node) {
        current_tissue.nodes[node_id] = node;
    });

    // Redraw everything
    this.UpdateGraph();
}

////////////////////////////////////////////////////////////////////////////////

Tissue.prototype.DeleteCell = function(cell_id) {
    // Delete the cell
    this.cells[cell_id].Delete();

    // Redraw everything
    this.UpdateGraph();
}

Tissue.prototype.DeleteIoEdge = function(io_edge_id) {
    // Delete the cell
    IoEdgeIdToIoEdge(io_edge_id).Delete();

    // Redraw everything
    this.UpdateGraph();
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

////////////////////////////////////////////////////////////////////////////////

/** Use graphviz to update the hierarchy of the cells
 */
Tissue.prototype.UpdateGraph = function() {
    var current_tissue = this;

    // Build the dot formated string that defines the graph
    var json_plasm = this.ToJson();

    // Ask the web server to build a new layout
    var post_answer = $.post(EctoBaseUrl + '/plasm/graph', {json_plasm:
        json_plasm, width: parseInt($(this.raphael.canvas).attr('width'))/100,
        height: parseInt($(this.raphael.canvas).attr('height'))/100},
        function(data) {
        data = $(data).find('svg').find('g');
        var scale_regex = /scale\(([.0-9]*) *([.0-9]*)\)/i;
        var scale = parseFloat(data.attr('transform').match(scale_regex)[1]);
        var translation_regex = /translate\(([0-9]*),* ([0-9]*)\)/i;

        var translation_x = parseInt(data.attr('transform').match(
                translation_regex)[1]),
            translation_y = parseInt(data.attr('transform').match(
                translation_regex)[2]);

        // Go over each node/edge, and edge to the Tissue nodes/edges
        $.each($(data), function(index, g_object) {
            switch ($(this).attr('class')) {
                case 'node':
                    var cell_id = parseInt($(this).find('title'
                        )[0].textContent);
                    // Update the SVG of the cell
                    current_tissue.cells[cell_id].svgUpdate($(this),
                        current_tissue, scale, translation_x, translation_y);
                    break;
                case 'edge':
                    $.each($(this).find('text'), function(text_index,
                                                          text_obj) {
                        var edge = IoEdgeIdToIoEdge(parseInt(
                            text_obj.textContent));
                        if (typeof edge != 'undefined') {
                            edge.svgUpdate($(g_object), current_tissue, scale,
                                translation_x, translation_y);
                            return false;
                        }
                    });
                    break;
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
    
    MainPlayer.UpdateIcons();
}

////////////////////////////////////////////////////////////////////////////////

/** Returns true if the tissue has nothing
 */
Tissue.prototype.IsEmpty = function () {
    return $.isEmptyObject(this.cells);
};

////////////////////////////////////////////////////////////////////////////////

/** Returns true if the tissue has nothing
 */
Tissue.prototype.IsValid = function () {
    // Go over each cell and figure out if all the parameters are set
    var is_valid = true;
    MainTissue.invalid_cell = undefined;
    $.each(this.cells, function(cell_id, cell) {
        $.each(cell.parameters, function(name, parameter) {
            if (parameter.required && (typeof parameter.value == 'undefined')) {
                is_valid = false;
                MainTissue.invalid_cell = cell;
                return false;
            }
        });
    });
    return is_valid;
};

////////////////////////////////////////////////////////////////////////////////

/** Function building a tissue from a JSON object
 */
Tissue.prototype.FromJson = function(json_plasm) {
    console.info(json_plasm);
    if ($.isEmptyObject(json_plasm))
        return;

    var current_tissue = this;
    this.Clear();
    $.each(json_plasm['cells'], function(id, json_cell) {
        // Create the new cell to add to the tissue
        var cell = new Cell(EctoCells[json_cell.module + '.' + json_cell.type], current_tissue, parseInt(id));
        current_tissue.cells[id] = cell;
        
        // TODO copy the parameters
        
        // Update all the nodes
        $.each(cell.io_nodes, function(node_id, node) {
            current_tissue.nodes[node_id] = node;
        });
    });
    
    // Update the graph
    this.UpdateGraph();
}

/** Function converting a Tissue to json
 */
Tissue.prototype.ToJson = function () {
    var do_string = true;
    if (do_string)
        var json_tissue = '{"cells": { ';
    else
        var json_tissue = {cells: {}, edges: {}};

    // Add the cells
    if (do_string) {
        $.each(this.cells, function(cell_id, cell) {
            json_tissue += '"' + cell_id + '":' + '{"type": "' + cell.name + 
                '", "parameters":{ ';
            // Add the parameters
            $.each(cell.parameters, function(key, parameter) {
                var value = parameter.value;
                if (typeof value == 'undefined')
                    return;
                if (typeof value == 'string')
                    json_tissue += '"' + key + '": "' + value + '",';
                else
                    json_tissue += '"' + key + '": ' + String(value) + ',';
            });
            json_tissue = json_tissue.substring(0,json_tissue.length-1) + 
                '}, "hierarchy": [ ';
            // Add the hierarchy
            $.each(cell.hierarchy, function(index, hierarchy) {
                json_tissue += '"' + hierarchy + '",';
            });
            json_tissue = json_tissue.substring(0,json_tissue.length-1) + ']},'
        });
        json_tissue = json_tissue.substring(0,json_tissue.length-1) + '}, ' +
            '"edges": { ';
    } else {
        $.each(this.cells, function(cell_id, cell) {
            json_tissue['cells'][cell_id] = {type: cell.name, module:
                cell.hierarchy[0], parameters: {}};
            $.each(cell.parameters, function(key, parameter) {
                var value = parameter.value;
                if (typeof value != 'undefined')
                    json_tissue['cells'][cell_id]['parameters'][key] = value;
            });
        });
    }
    
    // Add the cell edges
    if (do_string) {
        $.each(IoEdge.prototype.IdToIoEdge, function(edge_label, edge) {
            var sametail = edge.source.cell_id + edge.source.name,
                    samehead = edge.target.cell_id + edge.target.name;
            json_tissue += '"' + edge_label + '": {"id_out": "' +
                edge.source.cell_id + '", "io_out": "' + edge.source.name +
                '", "id_in": "' + edge.target.cell_id + '","io_in": "' +
                edge.target.name + '"},';
        });
        json_tissue = json_tissue.substring(0,json_tissue.length-1) + '}}';
    } else {
        $.each(IoEdge.prototype.IdToIoEdge, function(edge_label, edge) {
            var sametail = edge.source.cell_id + edge.source.name,
                    samehead = edge.target.cell_id + edge.target.name;
            json_tissue['edges'][edge_label] = {id_out: edge.source.cell_id,
                io_out: edge.source.name, id_in: edge.target.cell_id,
                io_in: edge.target.name};
        });
    }

    return json_tissue;
}

////////////////////////////////////////////////////////////////////////////////

/** Initialize the tissue: where the cells will be displayed and linked
 */
function EctoInitializeTissue(top, left, width) {
     MainTissue = new Tissue(top, left, width);
}
