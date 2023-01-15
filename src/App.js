import { useRef, useEffect } from 'react';
// import './App.css';
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

function App() {
  const videoRef = useRef();
  const canvasRef = useRef();

  let images = [];
  const webcamRef = useRef(null);

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).then(() => {
      faceDetection();
    })
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err)
      });
  }

  function getRandomArbitrary(min, max) {
    let random =  Math.random() * (max - min) + min;
    console.log("Random => ", random);
    return random;
  }
  

  const faceDetection = async () => {
   let time = getRandomArbitrary(5000, 15000)
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      console.log(detections);
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 0,
        height: 0,
      })

      const resized = faceapi.resizeResults(detections, {
        width: 10,
        height: 10,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized)
      // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
      // faceapi.draw.drawFaceExpressions(canvasRef.current, resized)

      const imageSrc = webcamRef.current.getScreenshot();
      images.push({ src: imageSrc });
      console.log("Image => ", images);

    }, time)
  }

  // useEffect(() => {
  //   console.log(canvasRef.current);
  // }, [canvasRef])


  const videoConstraints = {
    // width: 600,
    // height: 600,
    facingMode: "user",
  };






  return (
    <div className="app">
      <h1> AI FACE DETECTION</h1>
      <div className='app__video' style={{ display: "none" }}>
        <video crossOrigin='anonymous' ref={videoRef} autoPlay  ></video>
      </div>

      <canvas ref={canvasRef} width="940" height="650" className='app__canvas' />
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

export default App;