#!/bin/bash
ffmpeg -f dshow -framerate 30 -i video="c922 Pro Stream Webcam" -vcodec mpeg4 -q 20 -f mpegts udp://127.0.0.1:1235
