import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { io } from "socket.io-client";
import * as handTrack from "handtrackjs";

const socket = io("http://localhost:8000");

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
// const model = await handTrack.load();
const WebcamComponent = () => {
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };
  const webcamRef = useRef(null);

  const sendImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    let image = new Image();
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    image.src = imageSrc;

    // Load the model.
    handTrack.load().then((model) => {
      model.detect(image).then((predictions) => {
        // Remove the prediction where class == 5
        predictions = predictions.filter((prediction) => prediction.class != 5);
        // Truncate it to 1 prediction
        predictions = predictions.slice(0, 1);
        socket.emit("send-frame", {
          predictions: predictions,
          image: imageSrc,
        });
        model.renderPredictions(predictions, canvas, context, image);
      });
    });
  }, [webcamRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      sendImage();
    }, 1000 / 24);
    socket.on("response", (data) => {
      console.log(data);
      if (data.result === currentGoal) {
        setScore(score + 1);
        setCurrentGoal(letters[Math.floor(Math.random() * letters.length)]);
      } else {
        setResponseObject(data);
      }
    });
    return () => clearInterval(interval);
  }, [sendImage]);

  const [currentGoal, setCurrentGoal] = useState(
    letters[Math.floor(Math.random() * letters.length)]
  );
  const [gameStart, setGameStart] = useState(true);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [responseObject, setResponseObject] = useState({
    currentBox: null,
    predicted: null,
    accuracy: null,
  });

  useEffect(() => {
    timer > 0 &&
      setTimeout(() => setTimer(timer - 1), 1000) &&
      setTimeout(() => setGameStart(false), 31000);
  }, [timer]);

  return (
    <div className="font-lexend-deca font-light">
      {timer != 0 ? (
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-[100px]">
          <div className="flex flex-col items-center w-full">
            <div className="text-[72px] font-bold">{currentGoal}</div>
            <div className="flex justify-between px-[2px] w-full">
              <div>Timer: {timer}</div>
              <div>Score: {score}</div>
            </div>
            <div className="flex justify-between px-[2px] w-full">
              <div>Predicted Box: {responseObject.result}</div>
              <div>Accuracy: {responseObject.confidence}</div>
            </div>
          </div>

          <div className="flex flex-col rounded-lg overflow-hidden mt-[12px]">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              mirrored={true}
              className=""
            />
            <canvas id="canvas" className="mt-[-339px] z-10"></canvas>
            {/* <button
              className="self-center bg-[#fcd9fc] hover:bg-[#db8fdd] border border-black rounded-lg px-8 py-4 mt-8"
              onClick={() => sendImage()}
            >
              send to backend
            </button> */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center">
          <div className="text-[48px] font-semibold">Score: {score}</div>
          <button
            onClick={() => {
              setGameStart(true);
              setTimer(30);
              setScore(0);
            }}
            className="self-center sm:self-start bg-[#fcd9fc] hover:bg-[#db8fdd] border border-black rounded-lg px-8 py-4 mt-8"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
