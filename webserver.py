#Copyright Jon Berg , turtlemeat.com

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
from os import curdir, sep
import pkgutil
import string,cgi,time
import ecto
from ecto_opencv import highgui, calib, features2d

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/module/list':
            # list the different modules
            self.send_response(200)
            self.send_header('Content-type',    'text/html')
            self.end_headers()
            
            # List the different shared object of ecto_opencv
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
            print json.dumps(module_infos)
            self.wfile.write(json.dumps(module_infos))
            return
        else:
            try:
                if self.path.endswith(".html") or self.path.endswith(".js") or self.path.endswith(".css"):
                    f = open(curdir + sep + self.path) #self.path has /test.html
    #note that this potentially makes every file on your computer readable by the internet

                    self.send_response(200)
                    self.send_header('Content-type',	'text/html')
                    self.end_headers()
                    self.wfile.write(f.read())
                    f.close()
                    return
                if self.path.endswith(".esp"):   #our dynamic content
                    self.send_response(200)
                    self.send_header('Content-type',	'text/html')
                    self.end_headers()
                    self.wfile.write("hey, today is the" + str(time.localtime()[7]))
                    self.wfile.write(" day in the year " + str(time.localtime()[0]))
                    return
                    
                return
                    
            except IOError:
                self.send_error(404,'File Not Found: %s' % self.path)
     

    def do_POST(self):
        global rootnode
        try:
            ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
            if ctype == 'multipart/form-data':
                query=cgi.parse_multipart(self.rfile, pdict)
            self.send_response(301)
            
            self.end_headers()
            upfilecontent = query.get('upfile')
            print "filecontent", upfilecontent[0]
            self.wfile.write("<HTML>POST OK.<BR><BR>");
            self.wfile.write(upfilecontent[0]);
            
        except :
            pass

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

