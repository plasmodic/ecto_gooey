// File implementing the execution of a plasm

////////////////////////////////////////////////////////////////////////////////

function UpdatePlayerIcons() {
    if (MainTissue.IsValid()) {
        $('#button_play').show();
        $('#button_pause').hide();
        $('#icon_problem').hide();
    } else {
        $('#button_play').hide();
        $('#button_pause').hide();
        $('#icon_problem').show();
    }   
}

////////////////////////////////////////////////////////////////////////////////

/** Function to initialize the graph player on the page
 */
function EctoInitializePlayer(width) {
    // Add the different icons
    var button_play = $('<img/>').attr('id', 'button_play').attr('src',
        './image/play.png');
    var css_properties = {'position' : 'absolute', 'left': width/2 -
        parseInt(button_play.css('width'))};
    $('#player').append(button_play.css(css_properties));
    $('#player').append($('<img/>').attr('id', 'button_pause').attr('src',
        './image/pause.png').css(css_properties).hide());
    $('#player').append($('<img/>').attr('id', 'icon_problem').attr('src',
        './image/splash_green.png').css(css_properties).hide());
    
    // Bind the play icon to execute the graph from Python
    $('#button_play').click(function() {
        if ((MainTissue.IsEmpty()) || (!MainTissue.IsValid()))
            return;

        $('#button_play').hide();
        $('#button_pause').show();

        var json_plasm = MainTissue.ToJson();
        var post_answer = $.post(EctoBaseUrl + '/plasm/run', {json_plasm:
            json_plasm}, function(data) {
            console.info($(data));
        }, 'xml');
    });

    // Bind the play icon to pause the graph from Python
    $('#button_pause').click(function() {
        var tissue_json = MainTissue.ToJson();
        $('#button_play').show();
        $('#button_pause').hide();

        var post_answer = $.post(EctoBaseUrl + '/plasm/pause',
            {nothing: "1"}, function(data) {
        }, 'xml');
    });

    // Bind the danger icon to show the problems in the graph
    $('#icon_problem').click(function() {
        var tissue_json = MainTissue.ToJson();
        $('#button_play').show();
        $('#button_pause').hide();

        var post_answer = $.post(EctoBaseUrl + '/plasm/pause',
            {nothing: "1"}, function(data) {
        }, 'xml');
    });
    
    // Bind the problem icon to displaying the missing parameters
    $('#icon_problem').click(function() {
        DisplayParameters(MainTissue.invalid_cell);
    });
}

////////////////////////////////////////////////////////////////////////////////
