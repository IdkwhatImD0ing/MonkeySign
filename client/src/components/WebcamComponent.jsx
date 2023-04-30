import {useEffect, useRef, useCallback} from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'
import {io} from 'socket.io-client'

const socket = io('http://localhost:8000')

const WebcamComponent = () => {
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: 'user',
  }

  const webcamRef = useRef(null)

  const sendImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    console.log(imageSrc)
    socket.emit('send-frame', imageSrc)
  }, [webcamRef])

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button className="bg-red-400" onClick={() => sendImage()}>
        send to backend
      </button>
    </div>
  )
}

export default WebcamComponent
