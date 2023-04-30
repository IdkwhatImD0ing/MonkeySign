from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import base64
from fastapi_socketio import SocketManager

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = SocketManager(app=app)


@app.sio.on("send-frame")
async def send_frame(image: dict):
    # 1. take image, decode it, and send it to yolo client
    image = base64.b64decode(image["image"])
    await sio.emit("receive-frame", image, room=image["room"])

    # 2. yolo client sends bounding box
    # id, name, confidence, x, y, w, h = detection <- bounding box will have these values

    # 3. crop image based off of bounding box
    # resize to 244x244

    # 4. send to classification client
    # classification client returns array 26 long

    # 5. send to frontend
    # bounding box + index of max value in array
    await sio.emit("receive-frame", image, room=image["room"])
