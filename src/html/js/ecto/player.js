// File implementing the execution of a plasm, as well as its serialization

function TissueToJson(tissue) {
        // Add the modules
        return '';
    $.each(this.modules, function(module_id, module) {
        dot_graph += module_id + ' [ label = ' + current_tissue.modules[module_id].name + ' ];';
        //dot_graph += module_id + ' ';
    });
    // Add the module edges
    var edge_str_to_edge = {};
    $.each(this.nodes, function(node_id, node) {
        $.each(node.edges, function(edge_id, edge) {
            var sametail = edge.source.module_id + edge.source.name,
                samehead = edge.target.module_id + edge.target.name;
            var edge_label = samehead + '_' + sametail;
            edge_str_to_edge[edge_label] = edge;
        });
    });
     
    $.each(edge_str_to_edge, function(edge_label, edge) {
         var sametail = edge.source.module_id + edge.source.name,
                samehead = edge.target.module_id + edge.target.name;
        dot_graph += edge.source.module_id + ' -> ' + edge.target.module_id + ' [ arrowhead = "none", label = "' + edge_label + '",  headlabel = "' + edge.source.name + '", taillabel = "' + edge.target.name + '", samehead = "' + samehead + '", sametail = "' + sametail + '" ];';
    });
    dot_graph += '}';
}

////////////////////////////////////////////////////////////////////////////////

/** Function to initialize the graph player on the page
 */
function EctoInitializePlayer(width) {
    // Position the player button
    var css_properties = {'position' : 'absolute', 'left': width/2 - parseInt($('#button_play').css('width'))};
    $('#button_play').css(css_properties);
    $('#button_pause').css(css_properties).hide();
    
    // Bind it to send info about the graph to the server
    $('#button_play').click(function() {
        var json_plasm = TissueToJson(MainTissue);
        $('#button_play').hide();
        $('#button_pause').show();
        
        var post_answer = $.post(EctoBaseUrl + '/plasm/execute', {json_plasm: json_plasm}, function(data) {
            console.info(data);
        }, 'xml');
    });

    // Bind it to send info about the graph to the server
    $('#button_pause').click(function() {
        var tissue_json = TissueToJson(MainTissue);
        $('#button_play').show();
        $('#button_pause').hide();
    });
}

////////////////////////////////////////////////////////////////////////////////
