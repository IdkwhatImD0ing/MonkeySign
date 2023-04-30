import { useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => {
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    // fetch("http://localhost:3000/api/send-frame", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ imageSrc }),
    // });
  }, [webcamRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 1000);
    return () => clearInterval(interval);
  }, [capture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export default WebcamComponent;
