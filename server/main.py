from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import base64
from fastapi_socketio import SocketManager
from yolo import YOLO, get_bounding_boxes
from boundshrink import crop_and_resize
from infer import ASLInferrer

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
inferrer = ASLInferrer()
yolo.size = 416
yolo.confidence = 0.5


@app.sio.on("send-frame")
async def send_frame(image: dict):
    # 1. take image, decode it, and send it to yolo client
    image = base64.b64decode(image["image"])
    print(image)

    # 2. yolo client sends bounding box
    bounding_boxes = get_bounding_boxes(yolo, image)
    print(bounding_boxes)

    # 3. crop image based off of bounding box (Audrey)
    # resize to 244x244
    image = crop_and_resize(image, bounding_boxes)
    print(image)

    # 4. send to classification client (Bill)
    # classification client returns array 26 long
    result = inferrer.infer(image)
    print(result)

    # 5. send to frontend (Simon)
    data = [bounding_boxes, result[0], result[2]]
    
    await sio.emit("receive-data", data)
