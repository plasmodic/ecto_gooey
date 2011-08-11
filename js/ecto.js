// Contains the base of the URL
var EctoBaseUrl = location.href.split('/', 3).join('/');
// The main tissue on which the modules will be linked
var MainTissue;
// The width of what the working zone should be
var MainWidth = 1200;
var AnimationFast = 200;
var AnimationSlow = 600;

////////////////////////////////////////////////////////////////////////////////

$.fn.listHandlers = function(events, outputFunction) {
    return this.each(function(i){
        var elem = this,
            dEvents = $(this).data('events');
        if (!dEvents) {return;}
        $.each(dEvents, function(name, handler){
            if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
               $.each(handler, function(i,handler){
                   outputFunction(elem, '\n' + i + ': [' + name + '] : ' + handler );
               });
           }
        });
    });
};


////////////////////////////////////////////////////////////////////////////////

function EscapeHtml(input) {
    return $('<div/>').text(input).html();
}

////////////////////////////////////////////////////////////////////////////////

function EctoInitializePlayer(left) {
    $('#player').css({'position' : 'absolute', 'left': left});
}

////////////////////////////////////////////////////////////////////////////////

/** Initialize the page and different structures
 */
function EctoInitialize() {
    // Figure out the width of the main components
    var top = 40,
        tree_width = 250,
        param_width = 300,
        tissue_width = Math.max(500, MainWidth - param_width - tree_width);
    EctoInitializePlayer(tree_width/2);
    EctoInitializeModules(top,tree_width);
    EctoInitializeTissue(0, tree_width, tissue_width);
    EctoInitializeParameters(0,MainWidth-param_width, param_width);

    $(window).resize();
}

////////////////////////////////////////////////////////////////////////////////

// Initialize the data at the beginning
$(document).ready(function() {
    $.getScript(EctoBaseUrl + '/js/ecto/module.js', function() {
        EctoInitialize();
    }).error(function(x,e){
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
            }
    });
});

$(window).resize( function() {
    var width = $(document).width();
    $("#main_div").css({"position":"absolute","left":width/2-MainWidth/2});
});
