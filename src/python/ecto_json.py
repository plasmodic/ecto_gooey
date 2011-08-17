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
    json_plasm = json.loads(json_plasm)

    plasm = ecto.Plasm()
    # Create the different cells
    cells = {}
    for cell_id, cell_dict in json_plasm['cells'].iteritems():
        # import the right module and its cell
        hierarchy = '.'.join(cell_dict['hierarchy'])
        module = __import__(hierarchy, fromlist = [cell_dict['type']]);
        cell_creation_str = 'module.__dict__["%s"]( ' % (cell_dict['type'])
        # deal with the parameters
        for param, val in cell_dict['parameters'].iteritems():
            if isinstance(val, types.StringTypes):
                cell_creation_str += '%s="%s",' % (param, val)
            else:
                cell_creation_str += '%s=%s,' % (param, val)
        cell_creation_str = cell_creation_str[:-1] + ')'
        cells[cell_id] = eval(cell_creation_str)

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
