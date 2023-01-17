import { useRef, useEffect } from 'react'; 
import * as faceapi from "face-api.js";

function FaceDetection() {
  const videoRef = useRef();
  // const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);
  
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]).then(() => {
        faceDetecting();
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

  const faceDetecting = async () => {
    setInterval(async() => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
        console.log("Detected Face => ", detections.length);
    }, 5000)
  }

  return (
    <div  className="app">
      {/* <h1> AI FACE DETECTION</h1> */}
      <div className='app__video'  style={{ display: "none" }}>
        <video crossOrigin='anonymous' ref={videoRef} autoPlay ></video>
      </div>

    </div>
  );
}

export default FaceDetection;
