/** Update a parameter
 * @param cell_id the id of the cell whose parameter is modified
 * @param name the name of the parameter that is modified
 * @param value the value of the parameter that is modified
 */
function UpdateParams(cell_id, name, value) {
    var cell = MainTissue.cells[cell_id];
    cell.parameters[name].value = value;
    DisplayParameters(cell);
}

////////////////////////////////////////////////////////////////////////////////

function EctoInitializeParameters(top,left,width) {
    $('#cell_parameters').attr('style', 'position: absolute; left: ' + left +
'px; top: ' + top + 'px; width:' + width);
}

////////////////////////////////////////////////////////////////////////////////

/** Function that takes a string describing the parameter/io typeas follows:
 * - remove the allocator from an std::vector
 * It also return an htmlescaped string
 */
function CleanType(type_str) {
    // Check if allocator is in the variable name and remove it
    var allocator_index = type_str.indexOf(', std::allocator');
    if (allocator_index>=0) {
        var comp_count = 0;
        var index = allocator_index;
        while (index < (type_str.length)) {
            if (type_str.charAt(index) == '<')
                ++comp_count;
            if (type_str.charAt(index) == '>')
                --comp_count;
            if (comp_count<0) {
                type_str = type_str.slice(0,allocator_index) + type_str.slice(index-1);
                break;
            }
            ++index;
        }
    }

    return type_str;
}
////////////////////////////////////////////////////////////////////////////////

function DisplayParameters(cell) {
    var cell_params = $('#cell_parameters');

    // Delete the previous display
    cell_params.empty();

    // Create a new table containing the parameters
    var table_html = '<span class="info_title">' + cell.name +
        '</span><br/><br/>' + '<span class="info_title">Parameters</span>' +
        '<table class="parameter"><tbody>';
    console.info(cell.parameters);
    $.each(cell.parameters, function(key, param) {
        // Deal with required parameters with no value
        var tr_class = ''
        if ((typeof value == 'undefined') && (param.required))
            tr_class = ' info_table_required '
        // Fill the rows
        table_html += '<tr class="info_table_doc' + tr_class + '"><td ' +
            'colspan="2">' + param.doc + '</td></tr>';
        table_html += '<tr class="info_table_detail' + tr_class + '"><td>' +
            param.name + '</td><td>';
        if ((param.type == "int") || (param.type == "float") || (param.type == "std::string")) {
            table_html += '<input type="text" onblur="javascript:UpdateParams(' +
                cell.id + ', \'' + param.name + '\', this.value)" ';
            var value = cell.parameters[param.name].value;
            if (typeof value != 'undefined')
                table_html += 'value="' + value + '"';
            table_html += '/>';
        } else {
            alert(param.type + ' type not supported, for key ' + key + '. Ask Vincent');
            console.info(param);
        }
        table_html += '</td></tr>';
    });

    // Create a new table containing the nodes
    table_html += '</tbody></table><br/><span class="info_title">Tendrils</span><table class="parameter"><tbody>';
    $.each(cell.io_nodes, function(node_id, node) {
        table_html += '<tr class="info_table_doc"><td colspan="2">';
        if (node.doc == '')
            table_html += 'no doc for tendril \"' + node.name + '\"';
        else
            table_html += node.doc;
        table_html += '</td></tr><tr class="info_table_detail"><td>' + node.name + ': ' + EscapeHtml(node.type) + '</td></tr>';
    });

    table_html += '</tbody></table>';
    cell_params.append(table_html);

    // Stylize the tables a bit
    cell_params.children('.info_title').corner();
};
