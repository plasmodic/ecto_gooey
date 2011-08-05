////////////////////////////////////////////////////////////////////////////////

function DisplayParameters(module, params) {
    var message = '';
    //$('#module_params table').clear();
    var table_html = '<table><tbody>';
    $.each(params, function(key, param) {
        table_html += '<tr><td>' + param.doc + '</td></tr>';
        table_html += '<tr><td>' + param.name + '</td><td>';
            console.info(key);
            console.info(param);
        if ((param.type == "int") || (param.type == "float") || (param.type == "std::string")) {
            table_html += '<input type="text" onblur="javascript:UpdateParams(' +
                module.id + ', ' + param.name + ', ' + this.value + ')">';
        } else {
            console.info(key);
            console.info(param);
        }
        table_html += '</td></tr>';
    });
    table_html += '</tbody></table>';
    console.info(table_html);
    $('#module_params').append(table_html);
};
