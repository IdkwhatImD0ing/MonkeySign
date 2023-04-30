import base64
from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from yolo import YOLO, get_bounding_box
from boundshrink import crop_and_resize
from infer import ASLInferrer
from PIL import Image
import io
import numpy as np
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize YOLO on server startup
yolo = YOLO(
    "models/cross-hands-yolov4-tiny.cfg",
    "models/cross-hands-yolov4-tiny.weights",
    ["hand"],
)
inferrer = ASLInferrer()
yolo.size = 416
yolo.confidence = 0.5


@app.route("/")
def root():
    return {"message": "Hello World"}


@socketio.on("send-frame")
def send_frame(image):
    # 1. take image, decode it, and send it to yolo client
    data_url_pattern = re.compile(r"data:image/(.*);base64,")
    if data_url_pattern.match(image):
        image = data_url_pattern.sub("", image)
    base64_decoded = base64.b64decode(image)
    image = Image.open(io.BytesIO(base64_decoded))
    image_np = np.array(image)

    # 2. yolo client sends bounding box
    bounding_boxes = get_bounding_box(yolo, image_np)
    print(bounding_boxes)

    if(bounding_boxes == None):
        return

    # 3. crop image based off of bounding box (Audrey)
    # resize to 244x244
    image = crop_and_resize(image_np, bounding_boxes)
    # Save this image, shape is (244, 244, 3)
    image_pil = Image.fromarray((image).astype(np.uint8))
    image_pil.save("test.jpg")
    print(image.shape)

    # 4. send to classification client (Bill)
    # classification client returns array 26 long
    result = inferrer.infer(image)
    print(result)

    # 5. send to frontend (Simon)
    data = {
        "bounding_boxes": bounding_boxes,
        "result": result[0],
        "confidence": result[1],
    }

    socketio.emit("receive-data", data)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000)
