/** Update a parameter
 * @param cell_id the id of the cell whose parameter is modified
 * @param name the name of the parameter that is modified
 * @param value the value of the parameter that is modified
 */
function UpdateParams(cell_id, name, value) {
    // Update the values themselves
    var cell = MainTissue.cells[cell_id];
    switch (cell.parameters[name].type)
    {
        case "std::string":
            cell.parameters[name].value = String(value);
            break;
        case "int":
            cell.parameters[name].value = parseInt(value);
            break;
        case "float":
            cell.parameters[name].value = parseFloat(value);
            break;
        case "bool":
            cell.parameters[name].value = !cell.parameters[name].value;
            break;
        case "enum":
            $.each(cell.parameters[name].values, function(key, tmp_value) {
                if (value == tmp_value) {
                    cell.parameters[name].value = key;
                    return false;
                }
            });
            break;
        default:
    }
    // Update what is being displayed
    DisplayParameters(cell);
    // Let the server know about the changes
    var json_parameter = '{"name": "' + name + '", "value":';
    if (cell.parameters[name].type == "std::string")
        json_parameter += '"' + value + '"';
    else
        json_parameter += value;
    json_parameter += ', "cell_id": "' + cell_id + '"}';
    $.post(EctoBaseUrl + '/plasm/update', {json_parameter: json_parameter });
}

////////////////////////////////////////////////////////////////////////////////

function EctoInitializeParameters(top,left,width) {
    $('#cell_parameters').attr('style', 'position: absolute; left: ' + left +
'px; top: ' + top + 'px; width:' + width);
}

////////////////////////////////////////////////////////////////////////////////

/** Function that takes a string describing the parameter/io type as follows:
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

/** Function that takes a tendril (io or param) and creates some HTML string
 * describing it
 */
function TendrilToHtml(tendril) {
    return '<span class="info_tendril_name">' + tendril.name + 
            '</span> <span class="info_tendril_type">(' +
            EscapeHtml(tendril.type) +
            ')</span> : <span class="info_tendril_doc">' + tendril.doc +
            '</span>';
}

////////////////////////////////////////////////////////////////////////////////

function DisplayParameters(cell) {
    var cell_params = $('#cell_parameters');

    // Delete the previous display
    cell_params.empty();

    // Display info about the module
    cell_params.append('<br/>');
    cell_params.append($('<span/>').addClass('info_title ui-corner-top '+
        'ui-state-default').text(cell.name));
    cell_params.append('<br/><div class="ui-widget-content">' + cell.doc +
        '</div><br/><br/>');
    
    // Create a new table containing the parameters
    cell_params.append($('<span/>').addClass('info_title ui-corner-top '+
        'ui-state-default').text('Parameters'));
    var table = $('<table class="parameter ui-widget-content" width="100%"/>');
    $.each(cell.parameters, function(key, param) {
        // Deal with required parameters with no value
        var tbody = $('<tbody class="ui-widget-content"/>');
        var tr_class = ''
        if ((typeof value == 'undefined') && (param.required))
            tr_class = ' info_table_required '
        // Fill the rows
        var row = $('<tr class="' + tr_class + '"/>');
        row.append('<td>' + TendrilToHtml(param) + '<td/>');
        tbody.append(row);
        row = $('<tr class="' + tr_class + '"/>');
        var td = $('<td/>');

        // Deal with the different types
        var td_html;
        if ((param.type == "int") || (param.type == "float") || (param.type == "std::string")) {
            var td_html = '<input type="text" onblur="javascript:UpdateParams('
                + cell.id + ', \'' + param.name + '\', this.value)" ';
            var default_value = cell.parameters[param.name].value;
            if (typeof default_value != 'undefined')
                td_html += 'value="' + default_value + '"';
            td_html += 'class = "validate[';
            if (param.required)
                td_html += 'required,';
            switch (param.type) {
                case "int":
                    td_html += 'custom[integer]';
                    break;
                case "float":
                    td_html += 'custom[float]';
                    break;
                case "std::string":
                    break;
            }
            td_html += '] text-input"/>';
        } else if (param.type == "bool") {
            td_html = '<input type="checkbox" ' +
                'onclick="javascript:UpdateParams(' +
                cell.id + ', \'' + param.name + '\', this.value)" value="' +
                '"';
            var default_value = cell.parameters[param.name].value;
            if ((typeof default_value != 'undefined') && default_value)
                td_html += ' checked ';
            td_html += '/>';
        } else if (param.type == "enum") {
            var default_value = cell.parameters[param.name].value;
            td_html = '';
            $.each(cell.parameters[param.name].values, function(key, value) {
                td_html += '<input type="radio" ' +
                    'onclick="javascript:UpdateParams(' +
                    cell.id + ', \'' + param.name + '\', this.value)" value="' +
                    value + '" name="' + param.name + '"';
                if ((typeof default_value != 'undefined') &&
                    (key == default_value))
                    td_html += ' checked ';
                td_html += '>' + value + '<br/>';
            });
        } else {
            alert(param.type + ' type not supported, for key ' + key +
                '. Ask Vincent');
        }
        td.append('<form><fieldset>' + td_html + '</fieldset></form>');
        row.append(td);
        tbody.append(row);
        table.append(tbody);
    });
    cell_params.append(table);

    // Create a new table containing the nodes
    cell_params.append('<br/>');
    cell_params.append($('<span/>').addClass('info_title ui-corner-top '+
        'ui-state-default').text('Tendrils'));
    table = $('<table class="parameter ui-widget-content" ' +
        'width="100%"/>').append('<tbody/>');
    $.each(cell.io_nodes, function(node_id, node) {
        var row = $('<tr class="ui-widget-content"/>');
        var td = row.append('<td/>');
        td.append(TendrilToHtml(node));
        table.append(row);
    });

    cell_params.append(table);
};
