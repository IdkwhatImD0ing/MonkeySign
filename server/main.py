import base64
from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from boundshrink import crop_and_resize
from infer import ASLInferrer
from PIL import Image
import io
import numpy as np
import re
import random
import string
import cv2

def random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*")


inferrer = ASLInferrer()
# yolo.size = 14 * 32 # Must be a multiple of 32
# yolo.confidence = 0.5


@app.route("/")
def root():
    return {"message": "Hello World"}


@socketio.on("send-frame")
def send_frame(data):
    image = data['image']
    predictions = data['predictions']
    # remove dictionaries from predictions where class == 5
    if(len(predictions) == 0):
        return
    # 1. take image, decode it, and send it to yolo client
    data_url_pattern = re.compile(r"data:image/(.*);base64,")
    if data_url_pattern.match(image):
        image = data_url_pattern.sub("", image)
    base64_decoded = base64.b64decode(image)
    image = Image.open(io.BytesIO(base64_decoded))
    image_np = np.array(image)

    bounding_boxes = (
        int(predictions[0]["bbox"][0]),
        int(predictions[0]["bbox"][1]),
        int(predictions[0]["bbox"][2]),
        int(predictions[0]["bbox"][3]),
    )

    # 3. crop image based off of bounding box (Audrey)
    # resize to 244x244
    image = crop_and_resize(image_np, bounding_boxes)
    # Save this image with a random name
    # image_pil = Image.fromarray((image).astype(np.uint8))
    # image_pil.save(f"images{random_string(10)}.jpg")

    # 4. send to classification client (Bill)
    # classification client returns array 26 long
    result = inferrer.infer(image)
    print(result)

    # 5. send to frontend (Simon)
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    data = {
        "bounding_boxes": bounding_boxes,
        "result": alphabet[result[0]],
        "confidence": np.round(result[1], 2)
    }

    socketio.emit("response", data)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000)
