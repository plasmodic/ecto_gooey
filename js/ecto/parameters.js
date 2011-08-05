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

function DisplayParameters(module, params) {
    // Display info about the module

    // Delete the previous table
    $('#module_params table').remove();
    // Create a new table containing the parameters
    var table_html = '<table><tbody>';
    $.each(params, function(key, param) {
        table_html += '<tr><td colspan="2">' + param.doc + '</td></tr>';
        table_html += '<tr><td colspan="2">' + param.name + '</td><td>';
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
    table_html += '</tbody></table>';
    $('#module_params').append(table_html);
};
