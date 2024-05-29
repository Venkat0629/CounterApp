import React from "react";
import "../styles.css";
export default function AppCards({ countdown, message }) {
  if (message) return <div className="faded-text">{message}</div>;
  return (
    <div className="App-cards">
      <div className="card">
        <div className="dark-text">{countdown.days}</div>
        <div className="light-text">Days</div>
      </div>
      <div className="card">
        <div className="dark-text">{countdown.hours}</div>
        <div className="light-text">Hours</div>
      </div>
      <div className="card">
        <div className="dark-text">{countdown.minutes}</div>
        <div className="light-text">Minutes</div>
      </div>
      <div className="card">
        <div className="dark-text">{countdown.seconds}</div>
        <div className="light-text">Seconds</div>
      </div>
    </div>
  );
}
