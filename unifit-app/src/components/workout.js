/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-sync-scripts */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Container, Prose, Link, Card } from "./core";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// Pose Classification Utilities =====================================
export class RepCounter {
  constructor(stateName) {
    this.reps = 0;
    this.poseEntered = false;
    this.stateName = stateName;
  }

  count(poseClassification) {
    // Get pose confidence

    let poseConfidence = 0.0;
    if (this.stateName in poseClassification) {
      poseConfidence = poseClassification[this.stateName];
      // console.log(poseConfidence);
    }
    // On the very first frame or if we were out of the pose, just check if we
    // entered it on this frame and update the state
    if (!this.poseEntered) {
      this.poseEntered = poseConfidence > 6; // enter threshold
      return this.reps;
    }
    // If we were in the pose and are exiting it, then increase the counter and
    // update the state. exit threshold = 4
    if (poseConfidence < 4) {
      this.reps = this.reps + 1;
      this.poseEntered = false;
    }
    return this.reps;
  }
}

export class EMASmoothing {
  constructor() {
    this.windowSize = 10;
    this.alpha = 0.2;
    this.dataWindow = [];
  }

  smooth(data) {
    // Add new data to the beginning of the window for simpler code
    this.dataWindow.unshift(data);
    this.dataWindow = this.dataWindow.slice(0, this.windowSize);

    // Get all keys
    let keys = [];
    for (let i in this.dataWindow) {
      let data = this.dataWindow[i];
      for (let j in Object.keys(data)) {
        let key = Object.keys(data)[j];
        keys.push(key);
      }
    }
    keys = Array.from(new Set(keys));

    // Get smoothed values
    let smoothedData = {};
    for (let i in keys) {
      let key = keys[i];

      let factor = 1.0;
      let topSum = 0.0;
      let bottomSum = 0.0;
      for (let j in this.dataWindow) {
        let data = this.dataWindow[j];

        let value = 0.0;
        if (key in data) {
          value = data[key];
        }

        topSum += factor * value;
        bottomSum += factor;

        factor *= 1.0 - this.alpha;
      }
      // console.log(topSum, bottomSum);
      smoothedData[key] = topSum / bottomSum;
    }

    return smoothedData;
  }
}

// UI Components ===============================================

export function WorkoutView(props) {
  // For Pose Estimation
  const inputVideoRef = useRef();
  const canvasRef = useRef();
  const [landmarks, setLandmarks] = useState(null);

  const [popup, setPopup] = useState(true);

  // For Pose Classification
  const [repCounter, setRepCounter] = useState(null);
  const [emaSmoother, setEMASmoother] = useState(null);

  // Workout Interface
  const [nWorkout, setNWorkout] = useState(0);
  const [currWorkout, setCurrWorkout] = useState(props.workoutPlan);
  const [reps, setReps] = useState(0);
  const [remarks, setRemarks] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currSet, setCurrSet] = useState(0);
  const [start, setStart] = useState(false);

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
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
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
   * Initialize Pose Stuff on every workout change
   */
  useEffect(() => {
    setRepCounter(new RepCounter(currWorkout.repState));
    setEMASmoother(new EMASmoothing());
  }, [currWorkout]);

  /**
   * Run Pose Classifier
   */
  useEffect(() => {
    if (landmarks) {
      setPopup(false);

      if (start) {
        (async function () {
          // Run Pose Classifier
          let clsResponse = await fetch("http://127.0.0.1:5000/pred", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              landmarks: landmarks,
              exercise: currWorkout.exercise,
            }),
          });
          let output = await clsResponse.json();

          // Count Reps
          repCounter.count(output.pose_classification);

          // Smooth Predictions using EMA
          let poseClassification = emaSmoother.smooth(
            output.pose_classification
          );
          // console.log(repCounter.reps, poseClassification);
          setReps(repCounter.reps);

          // Get the pose state by sorting
          let _items = Object.keys(poseClassification).map(function (key) {
            return [key, poseClassification[key]];
          });
          _items.sort(function (first, second) {
            return second[1] - first[1];
          });
          let poseState = _items[_items.length - 1][0];
          // console.log(poseState);

          // Run Pose Critic
          let criticResponse = await fetch("http://127.0.0.1:5000/critic", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              landmarks: landmarks,
              exercise: currWorkout.exercise,
              pose_state: poseState,
            }),
          });
          let feedback = await criticResponse.json();
          // console.log(feedback.remarks);
          setRemarks(feedback.remarks);
          setIsCorrect(feedback.isCorrect);

          if (repCounter.reps > currWorkout.reps[currSet] - 1) {
            setReps(0);
            setIsCorrect(false);
            setRemarks(null);
            setStart(false);
            setRepCounter(new RepCounter(currWorkout.repState));
            setCurrSet(currSet + 1);
          }
        })();
      }
    }
  }, [landmarks, currWorkout, repCounter, emaSmoother, start, currSet]);

  useEffect(() => {
    if (currSet === currWorkout.reps.length) {
      setCurrSet(0);
    }
  }, [currSet, currWorkout]);

  return (
    <div>
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
          className={`block relative left-0 top-0 border-4 rounded-sm ${
            isCorrect ? "border-green-600" : "border-red-600"
          }`}
        ></canvas>

        <div
          className="absolute left-2 top-2 \
          border-2 border-slate-600 bg-slate-200 w-1/2 \
          rounded-md p-2"
        >
          <span className="text-lg font-bold">Status: </span>
          <span
            className={`text-lg ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {remarks}
          </span>
        </div>
        <div
          className="absolute right-20 top-2 \
          border-2 border-slate-600 bg-slate-200 \
          rounded-md p-2"
        >
          <span className="text-2xl font-bold">Reps: {reps}</span>
        </div>
        <button
          className="absolute right-2 top-2 \
          border-2 border-slate-600 bg-green-600 \
          rounded-md p-2 text-white"
          onClick={() => {
            setStart(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <LoadingPopup open={popup} setOpen={setPopup} />
    </div>
  );
}

export const LoadingPopup = (props) => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Please Wait...
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        We are setting up and loading our Intelligent UniFit
                        Tracking System
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={props.onLogin}
                >
                  Wait
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.setOpen(false)}
                >
                  Cancel
                </button>
              </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
