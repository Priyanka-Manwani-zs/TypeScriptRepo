import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TrafficLight from "./TrafficLight";

function App() {
  // if (intervalDuration === arr[0].time) {
  //   setColor(arr[1].color);
  //   setIntervalDuration(arr[1].time);
  // } else if (intervalDuration === arr[1].time) {
  //   setColor(arr[2].color);
  //   setIntervalDuration(arr[2].time);
  // } else {
  //   setColor(arr[0].color);
  //   setIntervalDuration(arr[0].time);
  // clearTimeout(timeOutId);
  return (
    <>
      <TrafficLight />
    </>
  );
}

export default App;
