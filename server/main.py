from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import base64
from fastapi_socketio import SocketManager
import argparse
import glob
import os
from yolo import YOLO, get_bounding_boxes


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = SocketManager(app=app)

# Initialize YOLO on server startup
yolo = YOLO(
    "models/cross-hands-yolov4-tiny.cfg",
    "models/cross-hands-yolov4-tiny.weights",
    ["hand"],
)
yolo.size = 416
yolo.confidence = 0.5


@app.sio.on("send-frame")
async def send_frame(image: dict):
    # 1. take image, decode it, and send it to yolo client
    image = base64.b64decode(image["image"])
    await sio.emit("receive-frame", image, room=image["room"])

    # 2. yolo client sends bounding box
    bounding_boxes = get_bounding_boxes(yolo, image)

    # 3. crop image based off of bounding box (Audrey)
    # resize to 244x244

    # 4. send to classification client (Bill)
    # classification client returns array 26 long

    # 5. send to frontend (Simon)
    # bounding box + index of max value in array
    await sio.emit("receive-frame", image, room=image["room"])
