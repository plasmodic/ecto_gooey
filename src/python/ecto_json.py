#!/usr/bin/env python
"""
Module detailing the different things that can be done with a JSON string
describing a plasm.
The JSON string is defined as follows:
{
    "cells": {
        "cell_id":  {
                        "type":   ,
                        "module": "module_1.module_2",
                        "parameters": {
                            "key": value,
                            ...
                            }
                    }, ...
        },
    "edges":  {
                "edge_id" :   {
                                "id_out": cell_id,
                                "io_out": io_name,
                                "id_in": cell_id,
                                "io_in": io_name,
                            }, ...
            }
}
"""

import ecto
import json
import types

################################################################################
# Code taken from
# http://stackoverflow.com/questions/956867/how-to-get-string-objects-instead-
# unicode-ones-from-json-in-python
# use with: object = json.loads(s, object_hook=_decode_dict)

def _decode_list(lst):
    newlist = []
    for i in lst:
        if isinstance(i, unicode):
            i = i.encode('utf-8')
        elif isinstance(i, list):
            i = _decode_list(i)
        newlist.append(i)
    return newlist

def _decode_dict(dct):
    newdict = {}
    for k, v in dct.iteritems():
        if isinstance(k, unicode):
            k = k.encode('utf-8')
        if isinstance(v, unicode):
             v = v.encode('utf-8')
        elif isinstance(v, list):
            v = _decode_list(v)
        newdict[k] = v
    return newdict

################################################################################

def PlasmToJson(plasm):
    """
    Function converting a plasm to JSON (for serialization or to pass it to the
    GUI for example)
    """
    plasm_dict = {'cells':{}, 'edges':{}}
    # First process the cells
    for cell_obj in plasm.cells():
        import inspect
        cell_json = {'type': cell_obj.name(), 'module':
            inspect.getmodule(cell_obj).__name__}
        parameters = {}
        params = cell_obj.params
        for key, tendril in params.iteritems():
            parameters[key] = tendril.val
        cell_json['parameters'] = parameters
        
        plasm_dict['cells'][id(cell_obj)] = cell_json
    # then process the edges
    for connection_id, connection_tuple in enumerate(plasm.connections()):
        plasm_dict['edges'][connection_id] = {'id_out': str(id(connection_tuple[0])),
            'io_out': connection_tuple[1], 'id_in': str(id(connection_tuple[2])),
            'io_in': connection_tuple[3]}
    print "plasm to json"
    print json.dumps(plasm_dict)
    return json.dumps(plasm_dict)

################################################################################

def JsonToPlasm(json_plasm):
    """
    Given a json string describing a plasm, get an ecto plasm
    """
    print 'The JSON string of the plasm is:\n' + json_plasm
    json_plasm = json.loads(json_plasm)

    plasm = ecto.Plasm()
    # Create the different cells
    cells = {}
    for cell_id, cell_dict in json_plasm['cells'].iteritems():
        # import the right module and its cell
        hierarchy = '.'.join(cell_dict['hierarchy'])
        module = __import__(hierarchy, fromlist = [cell_dict['type']]);

        # figure out the types of parameters of the cell, to deal with the enums
        cell_object = eval('module.__dict__["%s"].inspect((),{})' %
            cell_dict['type'])
        enum_parameters = {}
        for tendril in cell_object.params:
            tendril_type = type(tendril.data().val)
            if 'values' in tendril_type.__dict__:
                enum_parameters[tendril.key()] = tendril_type.values

        params = {}
        # deal with the parameters
        for param, val in cell_dict['parameters'].iteritems():
            param = param.encode('utf-8')
            if isinstance(val, types.StringTypes):
                params[param] = val.encode('utf-8')
            else:
                if enum_parameters.has_key(param):
                    # if it's an enum, don't put an int but the matching enum
                    params[param] = enum_parameters[param][val]
                else:
                    params[param] = val
        cells[cell_id] = module.__dict__[cell_dict['type']](**params)
        cells[cell_id].id = cell_id


    # Create the different connections between the cells
    for edge_id, edge in json_plasm['edges'].iteritems():
        plasm.connect(cells[edge['id_out']][str(edge['io_out'])] >>
            cells[edge['id_in']][str(edge['io_in'])])

    return plasm

################################################################################

def JsonToDot(json_plasm, width = None, height = None):
    """
    Given a json string describing a plasm, get the corresponding DOT
    format string
    """
    json_plasm = json.loads(json_plasm)
    dot_graph = 'digraph dot_graph { rankdir=TD; '
    if (width and height):
        dot_graph += 'size="%d,%d";' % (width, height)
    dot_graph += 'node [shape = circle]; dpi=100;\n'

    # Add the cells
    for cell_id, cell in json_plasm['cells'].iteritems():
        dot_graph += cell_id + ' [ label = "%s" ];\n' % cell['type']

    # Add the cell edges
    for edge_id, edge in json_plasm['edges'].iteritems():
        sametail = edge['id_out'] + edge['io_out']
        samehead = edge['id_in'] + edge['io_in']
        dot_graph += ('%s -> %s [ arrowhead = "none", label = "%s", ' +\
            'headlabel = "%s", taillabel = "%s", samehead = "head%s", ' +\
            'sametail = "tail%s" ];\n') % (edge['id_out'], edge['id_in'],
            edge_id, edge['io_out'], edge['io_in'], samehead, sametail)

    dot_graph += '}'

    return dot_graph
