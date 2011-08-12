#!/usr/bin/env python
"""
Module detailing the different things that can be done with a JSON string
describing a plasm.
The JSON string is defined as follows:
{
    modules: [
        {
            id:     ,
            type:   ,
            module; ,
            params: {
                key: value,
                ...
                }
        }, ...
            ],
    edges:  [
        {
            id_out: module_id,
            io_out; io_name,
            id_in: module_id,
            io_in; io_name,
        }, ...
            ]
}
"""

def JsonToPlasm(json_plasm):
    """
    Given a json string describing a plasm, get an ecto plasm
    """
    # TODO
    pass

def JsonToDot(json_plasm):
    """
    Given a json string describing a plasm, get the corresponding DOT format string
    """
    # TODO
    pass
