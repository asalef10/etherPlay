import dynamic from "next/dynamic";
import React from "react";

const DynamicCountdown = dynamic(() => import("react-countdown"), {
  ssr: false,
});

function CountdownTimer({ targetDate }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Countdown completed!</span>;
    } else {
      return (
        <div className="app">
          <h1 className="title">The Clock is Ticking</h1>
          <div className="timer-container">
            <div className="timer">
              <span>{days}</span>
              <span>days</span>
            </div>
            {<div className="semicolon">:</div>}
            <div className="timer">
              <span>{hours}</span>
              <span>hour</span>
            </div>
            {<div className="semicolon">:</div>}
            <div className="timer">
              <span>{minutes}</span>
              <span>minute</span>
            </div>
            {<div className="semicolon">:</div>}
            <div className="timer">
              <span>{seconds}</span>
              <span>second</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return <DynamicCountdown date={Number(targetDate)} renderer={renderer} />;
}

export default CountdownTimer;
