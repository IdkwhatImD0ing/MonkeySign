import base64
from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from yolo import YOLO, get_bounding_boxes
from boundshrink import crop_and_resize
from infer import ASLInferrer

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
def send_frame(image: dict):
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

    socketio.emit("receive-data", data)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000)
