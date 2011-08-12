#/usr/bin/env python

import sys

if sys.platform == "win32":
    from win32com.client import Dispatch
    def dot2svg(data):
        graphViz=Dispatch("WINGRAPHVIZ.dot")
        return graphViz.toSVG(data)
else:
#there might be a need for further specifying on other platforms
    import os
    def dot2svg(data):
        tmp_dot_file = '/tmp/dot_graph.dot'
        tmp_svg_file = '/tmp/svg_graph.svg'
        
        # write the DOT data to file
        tmp_file=open(tmp_dot_file,'w')
        tmp_file.write(data)
        tmp_file.close()

        command = "dot -Tsvg " + tmp_dot_file + " -o "+ tmp_svg_file #Tsvg can be changed to Tjpg, Tpng, Tgif etc (see dot man pages)
        os.system(command)
        
        # read the SVG data from file
        tmp_file = open(tmp_svg_file,'r')
        data = tmp_file.read()
        tmp_file.close()
        
        # delete the temporary files
        #os.system('rm ' + tmp_dot_file + ' ' + tmp_svg_file)

        return data

if __name__=="__main__":
    if len(sys.argv) != 2:
        print "Usage: python dot2svg.py mygraph.dot"
        exit ()
    filename=sys.argv[1]
    toSVG(filename)
