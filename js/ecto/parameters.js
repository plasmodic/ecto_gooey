/** Update a parameter
 * @param module_id the id of the module whose parameter is modified
 * @param name the name of the parameter that is modified
 * @param value the value of the parameter that is modified
 */
function UpdateParams(module_id, name, value) {
    MainTissue.modules[module_id].params[name].value = value;
}

////////////////////////////////////////////////////////////////////////////////

var ModuleParams = $('#module_params');

function EctoInitializeParameters(top,left,width) {
    $('#module_params').attr('style', 'position: absolute; left: ' + left + 'px; top: ' + top + 'px; width:200').attr('width', width);
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

function DisplayParameters(module, params) {
    var module_params = $('#module_params')

    // Delete the previous table
    module_params.empty();

    // Create a new table containing the parameters
    var table_html = '<span class="info_title">' + module.name + '</span><br/><table class="parameter"><tbody>';
    $.each(params, function(key, param) {
        table_html += '<tr class="parameter"><td colspan="2">' + param.doc + '</td></tr>';
        table_html += '<tr class="parameter"><td>' + param.name + '</td><td>';
        if ((param.type == "int") || (param.type == "float") || (param.type == "std::string")) {
            table_html += '<input type="text" onblur="javascript:UpdateParams(' +
                module.id + ', \'' + param.name + '\', this.value)" ';
            var value = module.params[param.name].value;
            if (typeof value != 'undefined')
                table_html += 'value="' + value + '"';
            table_html += '/>';
        } else {
            console.info(key);
            console.info(param);
        }
        table_html += '</td></tr>';
    });

    // Create a new table containing the nodes
    table_html += '</tbody></table><br/><br/><span class="info_title">Tendrils</span><table class="parameter"><tbody>';
    $.each(module.io_nodes, function(node_id, node) {
        table_html += '<tr class="parameter_io"><td>' + node.name + ': ' + EscapeHtml(node.type) + '</td></tr>';
    });

    table_html += '</tbody></table>';
    module_params.append(table_html);

    // Stylize the tables a bit
    module_params.children('.info_title').corner();
};
