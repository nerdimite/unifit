/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-sync-scripts */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Container, Prose, Link, Card } from "components/core";
import { WorkoutView } from "components/workout";
import WorkoutNavbar from "components/Navbars/WorkoutNavbar.js";

const workoutPlan = [
  {
    label: "Squats",
    exercise: "squats",
    repState: "squats_down",
    states: ["squats_down", "squats_up"],
    reps: [12, 10, 8],
  },

  {
    label: "Push Ups",
    exercise: "pushups",
    repState: "push_down",
    states: ["push_down", "push_up"],
    reps: [12, 10, 8],
  },

  {
    label: "Leg Raise",
    exercise: "legraise",
    repState: "leg_up",
    states: ["leg_down", "leg_up"],
    reps: [12, 10, 8],
  },
];

export default function Workout() {
  const [currWorkout, setCurrWorkout] = useState(workoutPlan[0]);
  return (
    <div className="">
      <WorkoutNavbar />
      <div className="mt-20 ">
        <Head>
          <title>Workout | UniFit</title>
          <meta name="description" content="The Future of Fitness is Here" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <Prose>
            {/* <h1>Workout</h1>
          <a href="/" className="decoration-blue-500">
            Home
          </a>
          <br />
          <a href="/app" className="decoration-green-500">
            Dashboard
          </a> */}
            <br />
          </Prose>

          <WorkoutView workoutPlan={currWorkout} />

          <div className="md:ml-[920px]">
            <Card className="border-2 border-blue-500">
              <div className="text-lg font-bold text-[0f172a]">
                Current Exercise{" "}
                <span className="text-red-500">{currWorkout.label}</span>
              </div>
            </Card>
            <Card className="border-2 bg-slate-700">
              <button
                className="hover:text-slate-500 text-white"
                onClick={() => {
                  setCurrWorkout(workoutPlan[0]);
                }}
              >
                Squats (12, 10, 8)
              </button>
            </Card>
            <Card className="border-2 bg-slate-700">
              <button
                className="hover:text-slate-500 text-white"
                onClick={() => {
                  setCurrWorkout(workoutPlan[1]);
                }}
              >
                Push Ups (12, 10, 8)
              </button>
            </Card>
            <Card className="border-2 bg-slate-700">
              <button
                className="hover:text-slate-500 text-white"
                onClick={() => {
                  setCurrWorkout(workoutPlan[2]);
                }}
              >
                Leg Raise (12, 10, 8)
              </button>
            </Card>
            <Card className="border-2 bg-slate-700">
              <button
                className="hover:text-slate-500 text-white"
                onClick={() => {
                  setCurrWorkout(workoutPlan[2]);
                }}
              >
                Crunches (12, 10, 8)
              </button>
            </Card>
            <Card className="border-2 bg-slate-700">
              <button
                className="hover:text-slate-500 text-white"
                onClick={() => {
                  setCurrWorkout(workoutPlan[2]);
                }}
              >
                Pike Pushups (12, 10, 8)
              </button>
            </Card>
          </div>
        </Container>
      </div>
    </div>
  );
}

// export default function Workout() {
//   // For Pose Estimation
//   const inputVideoRef = useRef();
//   const canvasRef = useRef();
//   const [landmarks, setLandmarks] = useState(null);

//   // For Pyodide
//   const indexURL = "https://cdn.jsdelivr.net/pyodide/dev/full/";
//   const pyodide = useRef(null);
//   const [isPyodideLoading, setIsPyodideLoading] = useState(true);

//   const [popup, setPopup] = useState(true);

//   // For Pose Classification
//   const [repCounter, setRepCounter] = useState(null);
//   const [emaSmoother, setEMASmoother] = useState(null);
//   const [runPose, setRunPose] = useState(false);
//   const [runTimer, setRunTimer] = useState(false);

//   // Workout Interface
//   const [nWorkout, setNWorkout] = useState(0);
//   const [currWorkout, setCurrWorkout] = useState(workoutPlan[0]);
//   const [reps, setReps] = useState(0);
//   const [remarks, setRemarks] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(null);
//   const [poseState, setPoseState] = useState(null);
//   const [currSet, setCurrSet] = useState(0);
//   const [timerMsg, setTimerMsg] = useState(null);
//   const [timer, setTimer] = useState(-1);
//   const [step, setStep] = useState(0);
//   const [start, setStart] = useState(false);

//   /**
//    * Initialize and Setup Pose Tracking
//    */
//   useEffect(() => {
//     const pose = new Pose({
//       locateFile: (file) => {
//         return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
//       },
//     });
//     pose.setOptions({
//       selfieMode: true,
//       modelComplexity: 1,
//       smoothLandmarks: true,
//       enableSegmentation: false,
//       smoothSegmentation: false,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });
//     pose.onResults(onResults);
//     const camera = new Camera(inputVideoRef.current, {
//       onFrame: async () => {
//         await pose.send({ image: inputVideoRef.current });
//       },
//       width: 1280,
//       height: 720,
//     });
//     camera.start();
//   }, []);

//   /**
//    * Draw the landmarks on the body when results are computed
//    */
//   const onResults = (results) => {
//     const canvasCtx = canvasRef.current.getContext("2d");
//     // console.log(canvasCtx, canvasRef.current.width);
//     canvasCtx.save();

//     canvasCtx.clearRect(
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );

//     drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
//       color: "#00FF00",
//       lineWidth: 4,
//     });
//     drawLandmarks(canvasCtx, results.poseLandmarks, {
//       color: "#FF0000",
//       lineWidth: 2,
//     });

//     // console.log(results.poseLandmarks);
//     setLandmarks(results.poseLandmarks);

//     canvasCtx.restore();
//   };

//   /**
//    * Initialize Pose Stuff on every workout change
//    */
//   useEffect(() => {
//     setRepCounter(new RepCounter(currWorkout.repState));
//     setEMASmoother(new EMASmoothing());
//   }, [currWorkout]);

//   /**
//    * Run Pose Classifier
//    */
//   useEffect(() => {
//     if (landmarks) {
//       setPopup(false);

//       if (start) {
//         (async function () {
//           // Run Pose Classifier
//           let clsResponse = await fetch("http://127.0.0.1:5000/pred", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Access-Control-Allow-Origin": "*",
//             },
//             body: JSON.stringify({
//               landmarks: landmarks,
//               exercise: currWorkout.exercise,
//             }),
//           });
//           let output = await clsResponse.json();

//           // Count Reps
//           repCounter.count(output.pose_classification);

//           // Smooth Predictions using EMA
//           let poseClassification = emaSmoother.smooth(
//             output.pose_classification
//           );
//           // console.log(repCounter.reps, poseClassification);
//           setReps(repCounter.reps);

//           // Get the pose state by sorting
//           let _items = Object.keys(poseClassification).map(function (key) {
//             return [key, poseClassification[key]];
//           });
//           _items.sort(function (first, second) {
//             return second[1] - first[1];
//           });
//           let poseState = _items[_items.length - 1][0];
//           // console.log(poseState);
//           setPoseState(poseState);

//           // Run Pose Critic
//           let criticResponse = await fetch("http://127.0.0.1:5000/critic", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Access-Control-Allow-Origin": "*",
//             },
//             body: JSON.stringify({
//               landmarks: landmarks,
//               exercise: currWorkout.exercise,
//               pose_state: poseState,
//             }),
//           });
//           let feedback = await criticResponse.json();
//           // console.log(feedback.remarks);
//           setRemarks(feedback.remarks);
//           setIsCorrect(feedback.isCorrect);

//           if (repCounter.reps > currWorkout.reps[currSet] - 1) {
//             setReps(0);
//             setIsCorrect(false);
//             setRemarks(null);
//             setStart(false);
//             setRepCounter(new RepCounter(currWorkout.repState));
//             setCurrSet(currSet + 1);
//           }
//         })();
//       }
//     }
//   }, [landmarks, currWorkout, repCounter, emaSmoother, start, currSet]);

//   useEffect(() => {
//     if (currSet === currWorkout.reps.length) {
//       setCurrSet(0);

//       if (nWorkout + 1 < workoutPlan.length) {
//         setCurrWorkout(workoutPlan[nWorkout + 1]);
//         setNWorkout(nWorkout + 1);
//       }
//     }
//     if (nWorkout + 1 === workoutPlan.length) {
//       alert("Workout Complete");
//     }
//   }, [currSet, currWorkout, nWorkout]);

//   return (
//     <Container>
//       <Head>
//         <title>Workout | UniFit</title>
//         <meta name="description" content="The Future of Fitness is Here" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Prose>
//         <h1>Workout</h1>
//         <a href="/" className="decoration-blue-500">
//           Home
//         </a>
//         <br />
//         <a href="/app" className="decoration-green-500">
//           Dashboard
//         </a>
//         <br />
//         <button
//           onClick={() => {
//             setStart(true);
//           }}
//         >
//           Start
//         </button>
//       </Prose>

//       <div>
//         <div className="absolute w-[889px] h-[500px]">
//           <video
//             autoPlay
//             ref={inputVideoRef}
//             className="absolute left-0 top-0 right-0 bottom-0"
//             style={{ transform: "scale(-1, 1)", height: "100%" }}
//           ></video>
//           <canvas
//             ref={canvasRef}
//             height={500}
//             width={889}
//             className={`block relative left-0 top-0 border-4 rounded-sm ${
//               isCorrect ? "border-green-600" : "border-red-600"
//             }`}
//           ></canvas>

//           <div
//             className="absolute left-2 top-2 \
//           border-2 border-slate-600 bg-slate-200 w-1/2 \
//           rounded-md p-2"
//           >
//             <span className="text-lg font-bold">Status: </span>
//             <span
//               className={`text-lg ${
//                 isCorrect ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {remarks}
//             </span>
//           </div>
//           <div
//             className="absolute right-2 top-2 \
//           border-2 border-slate-600 bg-slate-200 \
//           rounded-md p-2"
//           >
//             <span className="text-2xl font-bold">Reps: {reps}</span>
//           </div>
//         </div>
//       </div>

//       <div className="md:ml-[920px]">
//         <Card className="border-2 border-blue-500">
//           <div className="text-lg font-bold text-[0f172a]">
//             Current Exercise{" "}
//             <span className="text-red-500">{currWorkout.label}</span>
//           </div>
//         </Card>
//         <Card className="border-2 border-green-500">{nWorkout}</Card>
//       </div>

//       <LoadingPopup open={popup} setOpen={setPopup} />
//     </Container>
//   );
// }
