#!/usr/bin/env python
"""
Module detailing the different things that can be done with a JSON string
describing a plasm.
The JSON string is defined as follows:
{
    cells: {
        cell_id:  {
                        type:   ,
                        module; ,
                        parameters: {
                            key: value,
                            ...
                            }
                    }, ...
        },
    edges:  {
                edge_id :   {
                                id_out: cell_id,
                                io_out; io_name,
                                id_in: cell_id,
                                io_in; io_name,
                            }, ...
            }
}
"""

import json

def JsonToPlasm(json_plasm):
    """
    Given a json string describing a plasm, get an ecto plasm
    """
    # TODO
    pass

def JsonToDot(json_plasm, width = None, height = None):
    """
    Given a json string describing a plasm, get the corresponding DOT format string
    """
    json_plasm =  json.loads(json_plasm)
    dot_graph = 'digraph dot_graph { rankdir=TD; '
    if (width and height):
        dot_graph += 'size="%d,%d";' % (width, height)
    dot_graph += 'node [shape = circle]; dpi=100;';

    # Add the cells
    for cell_id, cell in json_plasm['cells'].iteritems():
        dot_graph += cell_id + ' [ label = %s ];' % cell['type']

    # Add the cell edges
    for edge_id, edge in json_plasm['edges'].iteritems():
        sametail = edge['id_out'] + edge['io_out'];
        samehead = edge['id_in'] + edge['io_in'];            
        dot_graph += ('%s -> %s [ arrowhead = "none", label = "%s", ' +\
            'headlabel = "%s", taillabel = "%s", samehead = "%s", ' +\
            'sametail = "%s" ];') % (edge['id_out'], edge['id_in'], edge_id,
            edge['io_out'], edge['io_in'], samehead, sametail)

    dot_graph += '}'

    return dot_graph
