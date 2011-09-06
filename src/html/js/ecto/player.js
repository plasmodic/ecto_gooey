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

/** Whenever the name of the plasm is changed, call that function
 */
function UpdatePlasmName(plasm_name) {
    console.info(plasm_name);
}

////////////////////////////////////////////////////////////////////////////////

/** Function to initialize the graph player on the page
 */
function EctoInitializePlayer(width) {
    // Add the file opening section
    var open_file_section = $('<div id="open_file"></div>');
    var file_path = $('<input type="file" name="file_path"/>');
    
    var plasm_name = $('plasm variable: <input type="text" onblur="javascript:UpdatePlasmName(this.value)"/>');
    open_file_section.append(file_path).append('<br/>').append(plasm_name);
    open_file_section.hide();
    $('#player').append(open_file_section);
    
    // Add the different icons
    var icon_width = 32;
    var css_properties = {'position' : 'absolute', 'left': width/2 -
        icon_width/2};
    $('#player').append($('<img/>').attr('id', 'button_load').attr('src',
        './image/folder.png'));
    $('#player').append($('<img/>').attr('id', 'button_play').attr('src',
        './image/play.png').css(css_properties));
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
        }, 'xml');
    });

    // Bind the pause icon to pause the graph from Python
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

    // Bind the folder icon to get a file path
    $('#button_load').click(function() {
        if ($('#open_file').css('display') == 'none')
            $('#open_file').show(AnimationSlow);
        else
            $('#open_file').hide(AnimationSlow);
    });
}

////////////////////////////////////////////////////////////////////////////////
