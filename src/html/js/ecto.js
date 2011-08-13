// Contains the base of the URL
var EctoBaseUrl = location.href.split('/', 3).join('/');
// The main tissue on which the modules will be linked
var MainTissue;
// The width of what the working zone should be
var MainWidth = 1200;
// The length, in milliseconds, of a fast animation (just like jQuery)
var AnimationFast = 200;
// The length, in milliseconds, of a slow animation (just like jQuery)
var AnimationSlow = 600;

////////////////////////////////////////////////////////////////////////////////

/** Function to escape a string for HTML
 */
function EscapeHtml(input) {
    return $('<div/>').text(input).html();
}

////////////////////////////////////////////////////////////////////////////////

/** Initialize the page and different structures
 */
function EctoInitialize() {
    // Figure out the width of the main components
    var top = 40,
        tree_width = 200,
        param_width = 300,
        tissue_width = Math.max(500, MainWidth - param_width - tree_width);
    EctoInitializePlayer(tree_width);
    EctoInitializeCells(top,tree_width);
    EctoInitializeTissue(0, tree_width, tissue_width);
    EctoInitializeParameters(0,MainWidth-param_width, param_width);

    $(window).resize();
}

////////////////////////////////////////////////////////////////////////////////

/** Initialize the data once the document is loaded
 */
$(document).ready(function() {
    $.getScript(EctoBaseUrl + '/js/ecto/cell.js', function() {
        EctoInitialize();
    }).error(function(x,e){
            if(x.status==0){
            alert('Cannot connect to the ecto web server.');
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

/** Function to esecute whenever the browser is resized
 */
$(window).resize( function() {
    var width = $(document).width();
    $("#main_div").css({"position":"absolute","left":width/2-MainWidth/2});
});
