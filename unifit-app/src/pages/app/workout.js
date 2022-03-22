/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-sync-scripts */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Container, Prose, Link } from "components/core";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";

export default function Workout() {
  // For pose estimation
  const inputVideoRef = useRef();
  const canvasRef = useRef();
  const [landmarks, setLandmarks] = useState(null);

  // For Pyodide
  const indexURL = "https://cdn.jsdelivr.net/pyodide/dev/full/";
  const pyodide = useRef(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  /**
   * Initialize and Setup Pose Tracking
   */
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    pose.setOptions({
      selfieMode: true,
      modelComplexity: 0,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);
    const camera = new Camera(inputVideoRef.current, {
      onFrame: async () => {
        await pose.send({ image: inputVideoRef.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }, []);

  /**
   * Load Pyodide Module
   */
  useEffect(() => {
    (async function () {
      pyodide.current = await globalThis.loadPyodide({ indexURL });
      await pyodide.current.loadPackage(["numpy", "scikit-learn"]);
      setIsPyodideLoading(false);
    })();
  }, [pyodide]);

  /**
   * Draw the landmarks on the body when results are computed
   */
  const onResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    // console.log(canvasCtx, canvasRef.current.width);
    canvasCtx.save();

    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });

    // console.log(results.poseLandmarks);
    setLandmarks(results.poseLandmarks);

    canvasCtx.restore();
  };

  /**
   * Evaluate and execute python code
   */
  useEffect(() => {
    if (!isPyodideLoading && landmarks) {
      const evaluatePython = async (pyodide, pythonCode) => {
        try {
          let _output = await pyodide.runPython(pythonCode);
          return _output;
        } catch (error) {
          console.error(error);
          return "Error evaluating Python code. See console for details.";
        }
      };
      (async function () {
        let response = await fetch("/python/main.py");
        let pythonCode = await response.text();
        // console.log(pythonCode);

        let output = await evaluatePython(pyodide.current, pythonCode);
        output(landmarks);
        // setPyodideOutput(_output(5));
        // console.log("JS", window.x.toJs());
      })();
    }
  }, [landmarks, isPyodideLoading, pyodide]);

  return (
    <Container>
      <Head>
        <title>Workout | UniFit</title>
        <meta name="description" content="The Future of Fitness is Here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Prose>
        <h1>Workout</h1>
        <a href="/" className="decoration-blue-500">
          Home
        </a>
        <br />
        <a href="/app" className="decoration-green-500">
          Dashboard
        </a>
      </Prose>
      <div className="absolute w-[889px] h-[500px]">
        <video
          autoPlay
          ref={inputVideoRef}
          className="absolute left-0 top-0 right-0 bottom-0"
          style={{ transform: "scale(-1, 1)", height: "100%" }}
        ></video>
        <canvas
          ref={canvasRef}
          height={500}
          width={889}
          className="block relative left-0 top-0 border-2 border-red-600"
        ></canvas>
        {/* <div ref={landmarkGridRef}></div> */}
      </div>
    </Container>
  );
}
