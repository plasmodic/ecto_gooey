// File implementing the execution of a plasm

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
        var json_plasm = MainTissue.ToJson();
        console.info(json_plasm);
        $('#button_play').hide();
        $('#button_pause').show();
        
        var post_answer = $.post(EctoBaseUrl + '/plasm/execute', {json_plasm: json_plasm}, function(data) {
            console.info(data);
        }, 'xml');
    });

    // Bind it to send info about the graph to the server
    $('#button_pause').click(function() {
        var tissue_json = MainTissue.ToJson();
        $('#button_play').show();
        $('#button_pause').hide();
    });
}

////////////////////////////////////////////////////////////////////////////////
