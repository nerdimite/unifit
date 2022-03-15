/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function Pyodide({
  loadingMessage = "loading…",
  evaluatingMessage = "evaluating…",
}) {
  const indexURL = "https://cdn.jsdelivr.net/pyodide/dev/full/";
  const pyodide = useRef(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [pyodideOutput, setPyodideOutput] = useState(evaluatingMessage);

  let pythonCode = `
    import js
    import numpy as np

    print('Before', js.x.to_py())
    js.x = [3, 2, 1]
    print('After', js.x)

    #def foo(bar):
        #return float(bar) ** 2
    
    #foo
  `;

  // load pyodide wasm module and initialize it
  useEffect(() => {
    (async function () {
      pyodide.current = await globalThis.loadPyodide({ indexURL });
      await pyodide.current.loadPackage("numpy");
      setIsPyodideLoading(false);
    })();
  }, [pyodide]);

  // evaluate python code with pyodide and set output
  useEffect(() => {
    window.x = [1, 2, 3];
    if (!isPyodideLoading) {
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
        let _output = await evaluatePython(pyodide.current, pythonCode);
        // setPyodideOutput(_output(5));
        console.log("JS", window.x.toJs());
      })();
    }
  }, [isPyodideLoading, pyodide, pythonCode]);

  return (
    <>
      <Head>
        <script src={`${indexURL}pyodide.js`} />
      </Head>
      <div>
        Pyodide Output: {isPyodideLoading ? loadingMessage : pyodideOutput}
      </div>
    </>
  );
}
