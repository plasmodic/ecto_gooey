

// A lot on that page is inspired by 
// http://bl.ocks.org/929623

// Contains the base of the URL
var EctoBaseUrl = location.href.split('/', 3).join('/');
// dictionary from a module name to the module object
var EctoModules = {};
// The main tissue on which the modules will be linked
var MainTissue;

function DebugObject(obj) {
  str='';
  for(prop in obj)
  {
    str+=prop + " value :"+ obj[prop]+"\n";
  }
  return(str);
}

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
    return escape(input);
}

////////////////////////////////////////////////////////////////////////////////

function Module(raw_module) {
    // This is a string
    var current_module = this;
    this.name = raw_module.name;
    // This is an associative array where the key is the name of the input\
    this.inputs = {};
    this.outputs = {};
    this.params = {};
    $.each(raw_module.inputs, function(index, input) {
        current_module.inputs[input.name] = input;
    });
    $.each(raw_module.outputs, function(index, output) {
        current_module.outputs[output.name] = output;
    });
    $.each(raw_module.params, function(index, param) {
        current_module.params[param.name] = param;
    });
};

/** Function used to display better some memebers in the toString function
 */ 
Module.prototype.toStringHelper = function(input, message) {
    var message = '</br>&nbsp;&nbsp;';
    var module = this;
    for (var member in input) {
        message += member + ': ' + $('<div/>').text(input[member]).html() + ', ';
    }
    return message;
};

/** Display the different members of the Module object
 */ 
Module.prototype.toString = function() {
    var message = '';
    var module = this;
    message += '<div>name: ' + this.name;
    message += '</br>inputs: ';
    $.each(module.inputs, function(key, input) {
        message += module.toStringHelper(input, message);
    });
    message += '</br>outputs: ';
    $.each(module.outputs, function(key, output) {
        message += module.toStringHelper(output, message);
    });
    message += '</br>params: ';
    $.each(module.params, function(key, param) {
        message += module.toStringHelper(param, message);
    });
    message += '</div></br>';
    return message;
};

////////////////////////////////////////////////////////////////////////////////

/** The class responsible for linking and displaying modules
 */ 
function Tissue() {
    var width = d3.select('#tissue').attr('width'),
        height = d3.select('#tissue').attr('height');
    this.nodes = [];
    this.links = [];
    this.layout = d3.layout.force()
        .nodes(this.nodes)
        .links(this.links)
        .size([width, height]);
    // The list of modules building the tissue
    this.modules = [];
    // Each added module will have a unique id
    this.module_id = 0;

    this.layout.on("tick", function() {
        d3.select('#tissue').selectAll("line.link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        d3.select('#tissue').selectAll("circle.node")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });
    
    
    // Make sure that when you hover the inputs/outputs, you show what they are
    var current_tissue = this;
    $('#tissue .node_input,.node_output').live('mouseover',
        function () {
            var index = parseInt($(this).attr('id').substring(5));
            var node = current_tissue.nodes[index];
            var x = node.x, y = node.y;

            d3.select('#tissue .hovered_text').remove();
            d3.select('#tissue').append("svg:text")
                .text(node.name + ' : ' + node.type)
                .attr("x",x + 10)
                .attr("y",y - 10)
                .attr('class', 'hovered_text');
        });
    $('#tissue .node_input').live('mouseout',
        function () {
            $('#tissue .hovered_text').fadeOut('slow');
        });

    // Create a line when you grab an input/output node
    $('#tissue .node_input,.node_output').live('mousedown', function () {
        var index = parseInt($(this).attr('id').substring(5));
        var node = current_tissue.nodes[index];
        var x = node.x, y = node.y;

        d3.select('#tissue').append("svg:line")
            .attr("x1",x)
            .attr("y1",y)
            .attr("x2",x)
            .attr("y2",y)
            .attr('class', 'current_link');
    });

    $(document).mouseup(function () {
        d3.select('#tissue .current_link').remove();
    });

    $(document).mousemove(function (e) {
      console.info(e.which);
        $('.current_link').attr("x2",e.clientX - parseInt($('#tissue').css('left')))
                .attr("y2",e.clientY - parseInt($('#tissue').css('top')));
    });
};

Tissue.prototype.addModule = function(module_name) {
    // Create the newmodule to add to the tissue
    var module = EctoModules[module_name];
    var current_tissue = this;
    module.id = this.module_id;
    this.module_id = this.module_id + 1;

    this.modules.push(module);

    // Add the cental node
    var node_center = {x: Math.random() * 600, y: Math.random() * 400};
    var module_id = "module_" + module.id;
    this.nodes.push(node_center);
    d3.select('#tissue').selectAll("circle.node")
        .data(this.nodes)
        .enter()//.append("g").attr("render-order", 1)
        .append("svg:circle", "circle.cursor")
        .attr("class", "node node_center")
        .attr("r", 30);
        //.call(this.layout.drag);

    // Add graphical nodes corresponding to the inputs
    $.each({'input': EctoModules[module_name].inputs, 'output': EctoModules[module_name].outputs}, function(type, elements) {
        $.each(elements, function(name, element) {
            var node = {'x': Math.random() * 600, 'y': Math.random() * 400, 'is_input': true, 'type': element.type, 'name': name, 'index': current_tissue.nodes.length};
            node['is_input'] = (type == 'input');
            current_tissue.nodes.push(node);
            current_tissue.links.push({source: node_center, target: node});
        });

        // Draw those nodes
        d3.select('#tissue').selectAll("circle.node")
            .data(current_tissue.nodes)
            .enter().insert("svg:circle", "circle.cursor")
            .attr("class", "node node_" + type)
            .attr("id", function(d) {
                return "node_" + d.index;
            })
            .attr("r", 8);
            //.call(current_tissue.layout.drag);
    });

    // Insert the links
    d3.select('#tissue').selectAll("line.link")
        .data(this.links)
        .enter().insert("svg:line", "circle.node")
        .attr("class", "link internal_link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

     //$('*').listHandlers('*',console.info);


    // Start the graph optimization
    this.layout.start();
}

////////////////////////////////////////////////////////////////////////////////

/** Get the list of modules from the server
 */
function ecto_initialize_modules() {
    $('#modules').html('');

    $.getJSON(EctoBaseUrl + '/module/list', function(data) {
    //$('#modules').append(String(data)).append(String(data["inputs"]));
    $.each(data, function (index, raw_module) {
        var module = new Module(raw_module);
        // Add the module to the list of modules
        EctoModules[module.name] = module;
        
        // Update the displayed list of modules
        $('#modules').append($('<a></a>')
            .text(module.name)
            .addClass('ecto_module')
            .attr('id', 'ecto_' + module.name)
            .attr('href', 'javascript:void(0)')
            .click(function() {
                MainTissue.addModule(module.name);
            })
        );
        $('#modules').append('</br>');
    });
  });
}

/** Initialize the tissue: where the modules will be displayed and linked
 */
function ecto_initialize_tissue() {
     MainTissue = new Tissue();
}

/** Initialize the page and different structures
 */
function ecto_initialize() {
    ecto_initialize_modules();
    ecto_initialize_tissue();

    //page_resize();
}


// Initialize the data at the beginning
$(document).ready(function() {
  ecto_initialize();
});
