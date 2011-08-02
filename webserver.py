#Copyright Jon Berg , turtlemeat.com

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
from os import curdir, sep
import pkgutil
import string,cgi,time
import ecto
import dot2svg
import urlparse
import sys

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        path = urlparse.urlparse(self.path).path
        print path
        if path == '/module/list':
            # list the different modules
            self.send_response(200)
            self.send_header('Content-type',    'text/html')
            self.end_headers()
            
            # List the different shared object of ecto_opencv
            # TODO ls of sys.path for ecto_*.so ?
            for module in ['ecto_opencv']:
                m = __import__(module)
                ms = [(module,m)]
                for loader, module_name, is_pkg in  pkgutil.walk_packages(m.__path__):
                    #print loader,module_name,is_pkg
                    module = loader.find_module(module_name).load_module(module_name)
                    ms.append((module_name,module))

            # list the different modules
            ecto_cells = []
            for module_name,x in ms:
                ecto_cells += ecto.list_ecto_module(x)

            # loop over each module and get info about them
            module_infos = []
            for module in ecto_cells:
                module_info = {'name': module.name()}
                for property_name, property in [ ('inputs', module.inputs), ('outputs', module.outputs), ('params', module.params) ]:
                    module_info[property_name] = [ {'name': tendril.key(), 'doc': tendril.data().doc, 'type': tendril.data().type_name, 'has_default': tendril.data().has_default, 'user_supplied': tendril.data().user_supplied, 'required': tendril.data().required, 'dirty': tendril.data().dirty} for tendril in property ]
                module_infos.append(module_info)
            #print json.dumps(module_infos)
            self.wfile.write(json.dumps(module_infos))
            return
        elif path.startswith('/module/graph'):
            # list the different modules
            self.send_response(200)
            self.send_header('Content-type',    'text/html')
            self.end_headers()
            
            # Read the DOT file format that was sent
            self.rfile.read(dot_string)
            print dot_string
            
            svg_graph = []
            self.wfile.write(json.dumps(svg_graph))
            return
        else:
            try:
                if path.endswith(".html") or path.endswith(".js") or path.endswith(".css") or path.endswith(".png"):
                    f = open(curdir + sep + path)

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
        global rootnode
        if 1:
            ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
            if ctype == 'multipart/form-data':
                postvars = cgi.parse_multipart(self.rfile, pdict)
            elif ctype == 'application/x-www-form-urlencoded':
                length = int(self.headers.getheader('content-length'))
                postvars = cgi.parse_qs(self.rfile.read(length), keep_blank_values=1)
            else:
                postvars = {}            
            self.end_headers()
            
            dot_graph = postvars['dot_graph'][0]
            print "dot graph: ", dot_graph
            svg_graph = dot2svg.dot2svg(dot_graph)
            svg_graph = svg_graph[svg_graph.find('<svg'):]
            print "svg graph: ", svg_graph

            self.wfile.write(svg_graph)

        #except :
         #   pass

def main():
    try:
        # ecto is 3c70 in l33t, which is hexadecimal for 15472. Yeah .... sorry about that
        server = HTTPServer(('', 15472), MyHandler)
        print 'started httpserver...'
        server.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        server.socket.close()

if __name__ == '__main__':
    main()

