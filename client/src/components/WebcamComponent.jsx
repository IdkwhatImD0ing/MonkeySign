import {useEffect, useState, useRef} from 'react'
import Webcam from 'react-webcam'
import ASLInferrer from './ASLInferrer'
import * as handTrack from 'handtrackjs'
import * as tf from '@tensorflow/tfjs'

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
const model = await handTrack.load()
const aslInferrer = new ASLInferrer()
await aslInferrer.loadModel()

const WebcamComponent = () => {
  const videoConstraints = {
    width: 1920,
    height: 1080,

    facingMode: 'user',
  }
  // State variables

  const [currentGoal, setCurrentGoal] = useState(
    letters[Math.floor(Math.random() * letters.length)],
  )
  const [gameStart, setGameStart] = useState(true)
  const [timer, setTimer] = useState(30)
  const [score, setScore] = useState(0)
  const [responseObject, setResponseObject] = useState({
    predicted: 'Loading',
    accuracy: 'Loading',
  })
  const responseObjectRef = useRef(responseObject)

  // Webcam and prediction
  const webcamRef = useRef(null)
  const predRef = useRef([])

  // Game logic
  const processing = useRef(true)
  const canvasRef = useRef(null)
  const emptyImage = useRef(new Image())
  const image = useRef(new Image())

  const predict = () => {
    if (!webcamRef.current) return
    tf.tidy(() => {
      const imageSrc = webcamRef.current.getScreenshot()
      image.current.src = imageSrc

      image.current.onload = () => {
        model.detect(image.current).then((predictions) => {
          if (predictions.length < 2) return
          // Remove the prediction where class == 5
          predictions = predictions.filter(
            (prediction) => prediction.class != 5,
          )
          // Truncate it to 1 prediction
          predictions = predictions.slice(0, 1)
          predRef.current = predictions

          // Drawing code
          emptyImage.current.width = image.current.width
          emptyImage.current.height = image.current.height

          const context = canvasRef.current.getContext('2d')
          predictions[0].label = responseObjectRef.current.result
          predictions[0].score = responseObjectRef.current.confidence
          model.renderPredictions(
            predictions,
            canvas,
            context,
            emptyImage.current,
          )
          // If the image is being processed, return
          if (!processing.current) {
            console.log('Skipped')
            return
          }

          // Crop image based on bounding box [x,y,width,height]
          const [x, y, width, height] = predictions[0].bbox

          // Convert the image to a tensor
          const imageTensor = tf.browser.fromPixels(image.current)

          // Slice the tensor based on the bounding box coordinates
          const croppedTensor = imageTensor.slice(
            [Math.round(y), Math.round(x), 0],
            [Math.round(height), Math.round(width), 3],
          )

          // Resize the tensor to 224x224
          const resizedTensor = tf.image.resizeBilinear(
            croppedTensor,
            [224, 224],
          )

          // Reshape the tensor to 1x224x224x3
          const reshapedTensor = resizedTensor.expandDims(0)

          aslInferrer.infer(reshapedTensor).then((prediction) => {
            predictions[0].label = letters[prediction[0]]
            predictions[0].score = prediction[1].toFixed(2)

            // Game logic
            if (predictions[0].label == currentGoal) {
              setScore((prevScore) => prevScore + 1)
              setCurrentGoal(
                letters[Math.floor(Math.random() * letters.length)],
              )
            }

            processing.current = false

            setResponseObject((prevState) => {
              const updatedState = {
                ...prevState,
                result: predictions[0].label,
                confidence: predictions[0].score,
              }
              responseObjectRef.current = updatedState
              return updatedState
            })
          })
        })
      }
    })
  }

  useEffect(() => {
    const animationLoop = () => {
      predict()
      requestAnimationFrame(animationLoop)
    }

    animationLoop()

    return () => {
      cancelAnimationFrame(animationLoop)
    }
  }, [webcamRef, canvasRef])

  useEffect(() => {
    if (timer <= 0) {
      setGameStart(false)
    } else {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(timeout)
    }
  }, [timer])

  useEffect(() => {
    const interval = setInterval(() => (processing.current = true), 1000 / 3)
    return () => clearInterval(interval)
  }, [])

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
              <div>Predicted: {responseObject.result}</div>
              <div>Accuracy: {responseObject.confidence}</div>
            </div>
          </div>

          <div className="flex flex-col rounded-lg overflow-hidden mt-[12px]">
            <div className="relative flex w-full aspect-w-16 aspect-h-9">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                mirrored={true}
                className=""
              />
              <canvas
                ref={canvasRef}
                id="canvas"
                className="absolute top-0 left-0 z-10"
              />
              {/* <button
              className="self-center bg-[#fcd9fc] hover:bg-[#db8fdd] border border-black rounded-lg px-8 py-4 mt-8"
              onClick={() => sendImage()}
            >
              send to backend
            </button> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center">
          <div className="text-[48px] font-semibold">Score: {score}</div>
          <button
            onClick={() => {
              setGameStart(true)
              setTimer(30)
              setScore(0)
            }}
            className="self-center sm:self-start bg-[#fcd9fc] hover:bg-[#db8fdd] border border-black rounded-lg px-8 py-4 mt-8"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default WebcamComponent
