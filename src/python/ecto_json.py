#!/usr/bin/env python
"""
Module detailing the different things that can be done with a JSON string
describing a plasm.
The JSON string is defined as follows:
{
    "cells": {
        "cell_id":  {
                        "type":   ,
                        "hierarchy": [ "module_1", "module_2" ],
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
    GUI for example
    """
    pass

################################################################################

def JsonToPlasm(json_plasm):
    """
    Given a json string describing a plasm, get an ecto plasm
    """
    print 'The JSON strig of the plasm is:\n' + json_plasm
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

        cell_creation_str = 'module.__dict__["%s"]( ' % (cell_dict['type'])
        # deal with the parameters
        for param, val in cell_dict['parameters'].iteritems():
            if isinstance(val, types.StringTypes):
                cell_creation_str += '%s="%s",' % (param, val)
            else:
                if enum_parameters.has_key(param):
                    # if it's an enum, don't put an int but the matching enum
                    cell_creation_str += '%s=%s,' % (param,
                        enum_parameters[param][val])
                else:
                    cell_creation_str += '%s=%s,' % (param, val)
        cell_creation_str = cell_creation_str[:-1] + ')'
        print cell_creation_str
        cells[cell_id] = eval(cell_creation_str)
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
    print json_plasm
    json_plasm = json.loads(json_plasm)
    dot_graph = 'digraph dot_graph { rankdir=TD; '
    if (width and height):
        dot_graph += 'size="%d,%d";' % (width, height)
    dot_graph += 'node [shape = circle]; dpi=100;'

    # Add the cells
    for cell_id, cell in json_plasm['cells'].iteritems():
        dot_graph += cell_id + ' [ label = %s ];' % cell['type']

    # Add the cell edges
    for edge_id, edge in json_plasm['edges'].iteritems():
        sametail = edge['id_out'] + edge['io_out']
        samehead = edge['id_in'] + edge['io_in']
        dot_graph += ('%s -> %s [ arrowhead = "none", label = "%s", ' +\
            'headlabel = "%s", taillabel = "%s", samehead = "%s", ' +\
            'sametail = "%s" ];') % (edge['id_out'], edge['id_in'], edge_id,
            edge['io_out'], edge['io_in'], samehead, sametail)

    dot_graph += '}'

    return dot_graph
