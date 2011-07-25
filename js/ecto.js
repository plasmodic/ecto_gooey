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

/** A Module is an abstract class containing info about how an ecto module works
 */
function ModuleBase(raw_module) {
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

/** A Module is an abstract class containing info about how an ecto module works
 */
function Module(base_module, is_generic) {
    // This is a string
    var current_module = this;
    this.name = base_module.name;
    this.id = Module.prototype.id;
    ++Module.prototype.id;

    this.hierarchy = 0;
    this.parents = [];
    this.children = [];

    // Copy the inputs/outputs/params
    this.inputs = base_module.inputs;
    this.outputs = base_module.outputs;
    this.params = base_module.params;
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

Module.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** A Node is one of the nodes in the graph
 * name: if an input/output, the name of it
 * type: 0 for center, 1 for input, -1 for output
 * var_type: if an input/output, the C++ type (int, string ...)
 * module_id: the id of the module that the node belongs to
 */
function Node(name,type,var_type,module_id) {
    this.x = Math.random() * 600;
    this.y = Math.random() * 400;
    this.type = type;
    this.var_type = var_type;
    this.name = name;
    this.id = Node.prototype.id;
    ++Node.prototype.id;
    this.module_id = module_id;
};

Node.prototype.id = 0;

////////////////////////////////////////////////////////////////////////////////

/** The class responsible for linking and displaying modules
 */ 
function Tissue() {
    var width = d3.select('#tissue').attr('width'),
        height = d3.select('#tissue').attr('height');
    // All the nodes that constitute the tissue
    this.nodes = [];

    this.links = [];
    this.layout = d3.layout.force()
        .nodes(this.nodes)
        .links(this.links)
        .size([width, height]);
    // The list of modules building the tissue
    this.modules = {};
    // The line that is dragged from one node to the next, if any
    this.current_line = {'is_alive':false, 'first_type':false, 'first_module_id':0, 'first_module_id': 0, 'first_node_id':0};

    var current_tissue = this;
    this.layout.on("tick", function(e) {
        // Make sure the nodes move depending on the hierarchy
        var k = .1 * e.alpha;
        current_tissue.nodes.forEach(function(o, i) {
            o.y += ((current_tissue.modules[o.module_id].hierarchy)*(-100) - o.y) * k;
            //o.x += (400 - o.x) * k;
        });
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
    $('#tissue .node_input,.node_output').live('mouseover',
        function () {
            var index = parseInt($(this).attr('id').substring(5));
            var node = current_tissue.nodes[index];
            var x = node.x, y = node.y;

            d3.select('#tissue .hovered_text').remove();
            d3.select('#tissue').append("svg:text")
                .text(node.name + ' : ' + node.var_type)
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
        // Sometimes the line still exists, so don't do anything then
        console.info(current_tissue.current_line.is_alive);
        if (!current_tissue.current_line.is_alive) {
            var index = parseInt($(this).attr('id').substring(5));
            var node = current_tissue.nodes[index];
            var x = node.x, y = node.y;

            d3.select('#tissue').append("svg:line")
                .attr("x1",x)
                .attr("y1",y)
                .attr("x2",x)
                .attr("y2",y)
                .attr('id', 'current_link');
            current_tissue.current_line.is_alive = true;
            current_tissue.current_line.first_node_id = node.id;
            current_tissue.current_line.first_type = node.type;
            current_tissue.current_line.first_module_id = node.module_id;
            current_tissue.current_line.first_var_type = node.var_type;
        };
    });

    // Finish the line when you release the button over an input/output
    $('#tissue .node_input,.node_output').live('mouseup', function (e) {
        // Only do it if there is a line
        if (current_tissue.current_line.is_alive) {
            var index = parseInt($(this).attr('id').substring(5));
            var node = current_tissue.nodes[index];
            // Make sure we are linking two different module
            if (node.module_id==current_tissue.current_line.first_module_id)
                return;
            // Make sure we are linking an input and an output
            if (node.type == current_tissue.current_line.first_type)
                return;
            // Make sure the type is the same
            if (node.var_type!=current_tissue.current_line.first_var_type)
                return;
            
            // If we passed everything, create a link
            current_tissue.links.push({source: current_tissue.nodes[current_tissue.current_line.first_node_id], target: node});
            var module_input, module_output;
            if (node.type == 1) {
                module_input = current_tissue.modules[node.module_id];
                module_output = current_tissue.modules[current_tissue.current_line.first_module_id];
            } else {
                module_output = current_tissue.modules[node.module_id];
                module_input = current_tissue.modules[current_tissue.current_line.first_module_id];
            }
            module_input.children.push(module_output);
            module_output.parents.push(module_input);
            current_tissue.UpdateHierarchy();
            
            // Update the graphical aspect
            current_tissue.UpdateLinks('external_link');
            current_tissue.current_line.is_alive = false;
            d3.select('#tissue #current_link').remove();
        };
    });

    $('#rectangle_tissue').mouseup(function (e) {
        if (e.target.id == 'rectangle_tissue') {
            if (current_tissue.current_line.is_alive) {
                current_tissue.current_line.is_alive = false;
                d3.select('#tissue #current_link').remove();
            }
        }
    });

    $(document).mousemove(function (e) {
        if (current_tissue.current_line.is_alive) {
            var x2 = e.clientX - parseInt($('#tissue').css('left'));
            var y2 = e.clientY - parseInt($('#tissue').css('top'));
            var x1 = $('#current_link').attr("x1"), y1 = $('#current_link').attr("y1");
            var offset_x, offset_y;
            if (x2>x1)
                offset_x = -1;
            else
                offset_x = 1;
            if (y2>y1)
                offset_y = -1;
            else
                offset_y = 1;
            $('#current_link').attr("x2",x2 + offset_x).attr("y2",y2 + offset_y);
        }
    });
};

Tissue.prototype.addModule = function(module_name) {
    // Create the newmodule to add to the tissue
    var module = new Module(EctoModules[module_name]);
    var current_tissue = this;
    this.modules[module.id] = module;

    // Add the cental node
    var node_center = new Node('module_' + module.id, 0,'',module.id);
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
            var node_type = 1;
            if (type=='output')
                node_type = -1;
            var node = new Node(element.name, node_type, element.type, module.id);
            current_tissue.nodes.push(node);
            current_tissue.links.push({source: node_center, target: node});
        });

        // Draw those nodes
        d3.select('#tissue').selectAll("circle.node")
            .data(current_tissue.nodes)
            .enter().insert("svg:circle", "circle.cursor")
            .attr("class", "node node_" + type)
            .attr("id", function(d) {
                return "node_" + d.id;
            })
            .attr("r", 8);
            //.call(current_tissue.layout.drag);
    });

    // Redraw everything
    this.UpdateLinks('internal_link');
}

/** Make sure the latest links are of type link_class 
 * link_class external_link or internal_link
 */
Tissue.prototype.UpdateLinks = function(link_class) {
    // Insert the links
    d3.select('#tissue').selectAll("line.link")
        .data(this.links)
        .enter().insert("svg:g").attr("rendering-order",1)
        .insert("svg:line", "circle.node")
        .attr("class", "link " + link_class)
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr('z-index',1);

     //$('*').listHandlers('*',console.info);

    // Start the graph optimization
    this.layout.start();
}

/** A module should have hierarchy as small as possible provided:
 * max(parent's + 1) <= hiearchy <= min(children -1)
 * If no children, fine, but if no parents, hierarchy = min(children -1)
 */
Tissue.prototype.UpdateHierarchy = function() {
    // Build the dot formated string that defines the graph
    var dot_graph = 'digraph dot_graph { rankdir=LR; size="8,5";node [shape = circle];';
    
    $.each(this.links, function(link_id, link) {
        if (link.source.module_id != link.target.module_id) {
            dot_graph += link.source.module_id + ' -> ' + link.target.module_id + ' [ label = ' + link.target.name + ' ];';
        }
    });
    
    dot_graph += '}';

    //
    var post_answer = $.post(EctoBaseUrl + '/module/graph', {dot_graph: dot_graph}, function(data) {
        console.info(data);
        console.info($(data).find('svg').find('g'));
        console.info($.parseXML(data));
        var svg_doc = $($.parseXML(data));

        console.info('toto');
        console.info(svg_doc.toString());
        console.info('toto');
        $('#tissue2').html(svg_doc.toString());
        // Deal with the SVG data
    }, 'xml')
    .error(function(x,e){
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
            }});
}

////////////////////////////////////////////////////////////////////////////////

/** Get the list of modules from the server
 */
function ecto_initialize_modules() {
    $('#modules').html('');

    $.getJSON(EctoBaseUrl + '/module/list', function(data) {
    //$('#modules').append(String(data)).append(String(data["inputs"]));
    $.each(data, function (index, raw_module) {
        var module = new ModuleBase(raw_module);
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
