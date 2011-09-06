#!/usr/bin/env python
"""
File meant to be used as a test with the GUIfor plasm loading
"""
import ecto
from ecto_opencv import highgui, imgproc

plasm = ecto.Plasm()
sobel = imgproc.Sobel(x=1)
imshow = highgui.imshow(waitKey=30)
video_capture = highgui.VideoCapture()
plasm.connect(video_capture['image'] >> sobel['input'],
                sobel['out'] >> imshow['input'])

if __name__ == '__main__':
    sched = ecto.schedulers.Singlethreaded(plasm)
    sched.execute()
