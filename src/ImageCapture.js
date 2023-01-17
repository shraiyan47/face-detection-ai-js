import { useRef, useEffect } from 'react';
import Webcam from "react-webcam";

function ImageCapture() {
  
  let images = [];
  const webcamRef = useRef(null);

  useEffect(() => {
    faceDetection();
  }, []);


  const faceDetection = async () => {
    
      const imageSrc = webcamRef.current.getScreenshot();
      images.push({ src: imageSrc });
      console.log("Image => ", images);

      setTimeout(faceDetection, 15000);
  }


  const videoConstraints = {
    // width: 600,
    // height: 600,
    facingMode: "user",
  };



  return (
    <div className="app">

      <h1>LOL</h1>
      <div className='app__video' style={{ visibility: "hidden" }}>
      {/* <div className='app__video' > */}

        <Webcam
          audio={false}
          // height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>

    </div>
  );
}

export default ImageCapture;