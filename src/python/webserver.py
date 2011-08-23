#!/usr/bin/env python
"""
File creating a web server to create and execute plasms
"""
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
from os import curdir, sep
import pkgutil
import string,cgi,time
import ecto
import dot2svg
import urlparse
import sys
import types
import ecto_json

################################################################################

class PlasmManager:
    """
    Class meant to be used as a global variable to execute the plasm created
    from JSON 
    """
    def __init__(self):
        self._plasm = None
        self._sched = None
        self._is_running = False

PLASM_MANAGER = PlasmManager()

################################################################################

class EctoWebServer(BaseHTTPRequestHandler):
    """
    Our web server that will handle the creation/executionn of a plasm
    """
    def do_GET(self):
        """
        When called, give back the requested file or info
        """
        path = urlparse.urlparse(self.path).path
        if path == '/cell/list':
            # list the different cells
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            # List the different shared object of ecto_opencv
            # TODO ls of sys.path for ecto_*.so ?
            cell_infos = []
            for module_name in ['ecto_opencv']:
                m = __import__(module_name)
                ms = [(module_name,m)]
                for loader, sub_module_name, is_pkg in  pkgutil.walk_packages(m.__path__):
                    #print loader,sub_module_name,is_pkg
                    module = loader.find_module(sub_module_name).load_module(sub_module_name)
                    ms.append((sub_module_name,module))

                # list the different cells
                for sub_module_name,x in ms:
                    ecto_cells = ecto.list_ecto_module(x)

                    # loop over each cell and get info about them
                    for cell in ecto_cells:
                        cell_info = {'name': cell.name(), 'module':
                            '%s.%s' % (module_name,sub_module_name), 'doc':
                            cell.short_doc}
                        for property_name, property in [ ('inputs',
                            cell.inputs), ('outputs', cell.outputs), ('params',
                            cell.params) ]:
                            cell_info[property_name] = []
                            for tendril in property:
                                dic = {'name': tendril.key(),
                                'doc': tendril.data().doc, 'type':
                                tendril.data().type_name, 'has_default':
                                tendril.data().has_default, 'user_supplied':
                                tendril.data().user_supplied, 'required':
                                tendril.data().required, 'dirty':
                                tendril.data().dirty}
                                if property_name == 'params':
                                    # special case of an enum
                                    tendril_type = type(tendril.data().val)
                                    if 'values' in tendril_type.__dict__:
                                        dic['type'] = 'enum'
                                        dic['values'] = {}
                                        for key, value in \
                                            tendril_type.values.iteritems():
                                            dic['values'][key] = str(value)
                                            if (str(value) ==
                                                    str(tendril.data().val)):
                                                dic['value'] = key
                                                break
                                    else:
                                        dic['value'] = tendril.data().val

                                cell_info[property_name].append(dic)
                        cell_infos.append(cell_info)
            self.wfile.write(json.dumps(cell_infos))
            return
        else:
            # simply send back the file that is asked for
            if path == '/':
                path = '/index.html'
            # TODO deal with the favicon
            if path.endswith(".ico"):
                path = '/image/' + path
            print path
            try:
                if path.endswith(".html") or path.endswith(".js") or \
                        path[-4:] in [ ".css", ".png", ".jpg", ".ico" ]:
                    f = open(curdir + sep + '../html/' + path)

                    self.send_response(200)
                    if path.endswith(".js"):
                        self.send_header('Content-type', 'text/javascript')
                    elif path.endswith(".css"):
                        self.send_header('Content-type', 'text/css')
                    elif path.endswith(".png"):
                        self.send_header('Content-type', 'image/png')
                    elif path.endswith(".jpg"):
                        self.send_header('Content-type', 'image/jpeg')
                    elif path.endswith(".ico"):
                        self.send_header('Content-type',
                            'image/vnd.microsoft.icon')
                    else:
                        self.send_header('Content-type', 'text/html')
                    self.end_headers()
                    self.wfile.write(f.read())
                    f.close()
                    return
                    
                return
                    
            except IOError:
                self.send_error(404,'File Not Found: %s' % self.path)
     
    def do_POST(self):
        """
        Function executing some requests
        """
        # get the variables sent to the server
        ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
        if ctype == 'multipart/form-data':
            postvars = cgi.parse_multipart(self.rfile, pdict)
        elif ctype == 'application/x-www-form-urlencoded':
            length = int(self.headers.getheader('content-length'))
            postvars = cgi.parse_qs(self.rfile.read(length), keep_blank_values=1)
        else:
            postvars = {}            
        self.end_headers()

        path = urlparse.urlparse(self.path).path
        print path

        if path == '/plasm/graph':
            if PLASM_MANAGER._sched:
                PLASM_MANAGER._sched.stop()
            # get the DOT file and convert it to SVG
            json_plasm = postvars['json_plasm'][0]
            if postvars.has_key('width') and postvars.has_key('height'):
                svg_graph = dot2svg.dot2svg(ecto_json.JsonToDot(json_plasm,
                    int(postvars['width'][0]), int(postvars['height'][0])))
            else:
                svg_graph = dot2svg.dot2svg(ecto_json.JsonToDot(json_plasm))

            svg_graph = svg_graph[svg_graph.find('<svg'):]

            self.wfile.write(svg_graph)
        elif path == '/plasm/run':
            PLASM_MANAGER._is_running = True
            # get the plasm as JSON and execute it
            PLASM_MANAGER._plasm = ecto_json.JsonToPlasm(
                postvars['json_plasm'][0])

            # Execute the plasm in a different thread
            if PLASM_MANAGER._sched:
                PLASM_MANAGER._sched.stop()
            PLASM_MANAGER._sched = ecto.schedulers.Singlethreaded(
                PLASM_MANAGER._plasm)
            PLASM_MANAGER._sched.execute_async()
        elif path == '/plasm/pause':
            # TODO
            if PLASM_MANAGER._sched:
                PLASM_MANAGER._sched.stop()
            PLASM_MANAGER._is_running = False
        elif path == '/plasm/update':
            if not PLASM_MANAGER._plasm:
                return
            # get the parameter values that got updated
            json_parameter = json.loads(postvars['json_parameter'][0],
                                            object_hook=ecto_json._decode_dict)

            name = json_parameter['name']
            value = json_parameter['value']
            cell_id = json_parameter['cell_id']
            # update the parameter of the corresponding cell
            for cell in PLASM_MANAGER._plasm.cells():
                if (not hasattr(cell, 'id')) or (cell.id != cell_id):
                    continue
                for param in cell.params:
                    if param.key() != name:
                        continue
                    tendril = param.data()
                    t = type(tendril.val)
                    try:
                        tendril.set(t(value))
                    except ValueError, e:
                        print e
                    break
                break

################################################################################

if __name__ == '__main__':
    try:
        # ecto is 3c70 in l33t, which is hexadecimal for 15472. Yeah .... sorry about that
        server = HTTPServer(('', 15472), EctoWebServer)
        print 'started ecto web server on http://localhost:15472/'
        server.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        server.socket.close()
