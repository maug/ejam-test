import React, { useEffect, useRef, useState } from 'react';
import { LinearProgressWithLabel } from "./LinearProgressWithLabel";

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<typeof callback>();

  // remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (delay !== 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

interface Time {
  milliseconds: string,
  seconds: string,
  minutes: string,
}

function toTime(time: number): Time {
  return {
    milliseconds: Math.floor(time % 1000).toString().padStart(3, '0'),
    seconds: Math.floor((time / 1000) % 60).toString().padStart(2, '0'),
    minutes: Math.floor(time / (1000 * 60)).toString().padStart(2, '0'),
  };
}

export function CountdownTimer(props: { countdownFrom: number, step: number,  handleEnd: () => void }) {

  const [prevTime, setPrevTime] = useState<number | null>(null);
  const [timeInMilliseconds, setTimeInMilliseconds] = useState<number>(props.countdownFrom);
  const [time, setTime] = useState<Time | null>(null);
  const [delay, setDelay] = useState<number>(props.step);

  useInterval(
    () => {
      const now = Date.now();
      const prev = prevTime ?? now;
      const diffTime = now - prev;
      const newMilliTime = Math.max(timeInMilliseconds - diffTime, 0);
      const newTime = toTime(newMilliTime);
      setPrevTime(now);
      setTimeInMilliseconds(newMilliTime);
      setTime(newTime);
      if (newMilliTime === 0) {
        setDelay(0);
        props.handleEnd();
      }
    },
    props.countdownFrom && delay ? delay : 0
  );

  return (
    <div>
      {time && props.countdownFrom ?
        <LinearProgressWithLabel
          value={Math.round(100 - (timeInMilliseconds * 100 / props.countdownFrom))}
          labelLeft={`${time.minutes}:${time.seconds}:${time.milliseconds}`}
        />
        : null
      }
    </div>
  );
}
