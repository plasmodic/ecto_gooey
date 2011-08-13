#!/usr/bin/env python
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
from os import curdir, sep
import pkgutil
import string,cgi,time
import ecto
import dot2svg
import urlparse
import sys
import ecto_json

class EctoWebServer(BaseHTTPRequestHandler):
    """
    Our web server that will handle the creation/executionn of a plasm
    """

    def do_GET(self):
        """
        When called, give back the requested file or info
        """
        path = urlparse.urlparse(self.path).path
        print path
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
                        cell_info = {'name': cell.name(), 'hierarchy':
                            [module_name,sub_module_name]}
                        for property_name, property in [ ('inputs', cell.inputs), ('outputs', cell.outputs), ('params', cell.params) ]:
                            cell_info[property_name] = [ {'name': tendril.key(),
                                'doc': tendril.data().doc, 'type':
                                tendril.data().type_name, 'has_default':
                                tendril.data().has_default, 'user_supplied':
                                tendril.data().user_supplied, 'required':
                                tendril.data().required, 'dirty':
                                tendril.data().dirty} for tendril in property ]
                        cell_infos.append(cell_info)

            self.wfile.write(json.dumps(cell_infos))
            return
        else:
            # simply send back the file that is asked for
            if path == '/':
                path = '/index.html'
            try:
                if path.endswith(".html") or path.endswith(".js") or path.endswith(".css") or path.endswith(".png"):
                    f = open(curdir + sep + '../html/' + path)

                    self.send_response(200)
                    if path.endswith(".js"):
                        self.send_header('Content-type', 'text/javascript')
                    elif path.endswith(".css"):
                        self.send_header('Content-type', 'text/css')
                    elif path.endswith(".png"):
                        self.send_header('Content-type', 'image/png')
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

        if path == '/cell/graph':
            # get the DOT file and convert it to SVG
            #dot_graph = ecto_json.JsonToDot(postvars['json_plasm'][0])
            # TODO
            json_plasm = postvars['json_plasm'][0]
            if postvars.has_key('width') and postvars.has_key('height'):
                svg_graph = dot2svg.dot2svg(ecto_json.JsonToDot(json_plasm,
                    int(postvars['width'][0]), int(postvars['height'][0])))
            else:
                svg_graph = dot2svg.dot2svg(ecto_json.JsonToDot(json_plasm))

            svg_graph = svg_graph[svg_graph.find('<svg'):]

            self.wfile.write(svg_graph)
        elif path == '/plasm/execute':
            # get the plasm as JSON and execute it
            plasm = ecto_json.JsonToPlasm(postvars['json_plasm'][0])

            # TODO
            

if __name__ == '__main__':
    try:
        # ecto is 3c70 in l33t, which is hexadecimal for 15472. Yeah .... sorry about that
        server = HTTPServer(('', 15472), EctoWebServer)
        print 'started http server on http://localhost:15472/'
        server.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        server.socket.close()
