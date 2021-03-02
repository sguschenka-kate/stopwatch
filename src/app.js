import { useEffect, useState, useRef } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { timeConvertion } from './lib/timeConvertion';
import useDoubleClick from 'use-double-click';
import './app.css';

function App() {
  const [sec, setSec] = useState(0);
  const [lastValue, setLastValue] = useState(sec);
  const [status, setStatus] = useState("stop");

  const res = timeConvertion(lastValue);

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(
        takeUntil(unsubscribe$),
      )
      .subscribe((val) => {
        if (status === "start") {
          setSec(lastValue + 1)
          setLastValue(sec)
        }
        if (status === "wait") {
          unsubscribe$.next();
          setLastValue(sec)
        }
        if (status === "single-wait") {
          unsubscribe$.next();
        }
      });
    return () => {
      unsubscribe$.next();
    };
  }, [lastValue, sec, status]);

  const start = () => {
    setStatus("start");
  };

  const stop = () => {
    setStatus("stop");
    setSec(0);
    setLastValue(0)
  };

  const reset = () => {
    setSec(0);
    setLastValue(0)
  };

  const waitRef = useRef();
  const wait = useDoubleClick({
    onSingleClick: e => {
      setStatus("single-wait")
    },
    onDoubleClick: e => {
      setStatus("wait")
    },
    ref: waitRef,
    latency: 300
  })

  return (
    <div className="app">
      <h1 className="app__title">Stopwatcher</h1>

      <div className="app__counter-container"> {res} </div>

      <div className="app__buttons-container">
        <button
          className="button"
          onClick={start}
        >Start</button>
        <button
          className="button"
          onClick={stop}
        >Stop</button>
        <button
          className="button"
          ref={waitRef}
          onClick={wait}
        >Wait</button>
        <button
          className="button"
          onClick={reset}
        >Reset</button>
      </div>
    </div>
  );
}

export {
  App
}
