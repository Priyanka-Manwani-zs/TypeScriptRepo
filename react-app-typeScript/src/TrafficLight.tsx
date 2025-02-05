import React, { useEffect, useState } from "react";
import "./light.css";

const TrafficLight: React.FC = () => {
  const [color, setColor] = useState<string>("red");
  // const arr: any = [
  //   { color: "red", time: 5000 },
  //   { color: "yellow", time: 2000 },
  //   { color: "green", time: 3000 },
  // ];

  let timeOutId: number = 0;

  // function changeColor() {
  //   for (let i = 0; i < arr.length; i++) {
  //     //   setIntervalDuration(arr[0].time);

  //     console.log(timeOutId);

  //     if (i == arr.length) {
  //       return;
  //     }
  //     timeOutId = setTimeout(() => {
  //       setColor(arr[i].color);                                           //my wrong logic
  //     }, arr[i].time);
  //     // setColor(arr[i].color);
  //   }
  //   console.log(timeOutId);
  //   // }

  //   clearInterval(id);
  // }
  // let id = setInterval(() => {
  //   clearTimeout(timeOutId);
  //   changeColor();
  // }, 7000);

  // let id = 0;
  // const [ind, setInd] = useState<number>(0);
  // function changeColor() {
  //   id = setTimeout(() => {
  //     setColor(arr[ind].color);
  //     setInd((prev) => (prev + 1) % arr.length);                                              //use effect logic
  //   }, arr[ind].time);
  // }

  // useEffect(() => {
  //   changeColor();

  //   return () => {
  //     clearTimeout(id);
  //   };
  // }, [ind]);

  const [newcolor, setNewColor] = useState<string>("red");
  function changeColor() {
    if (newcolor == "red") {
      setTimeout(() => {
        setColor("yellow");
        setNewColor("yellow");
      }, 5000);
    }
    if (newcolor == "yellow") {
      setTimeout(() => {
        setColor("green");
        setNewColor("green");
      }, 2000);
    }
    if (newcolor == "green") {
      setTimeout(() => {
        setColor("red");
        setNewColor("red");
      }, 3000);
    }
  }

  changeColor();
  return (
    <>
      <div className="maindiv">
        <div className="light">
          <div className={color == "red" ? "red" : "circle"}></div>
          <div className={color == "yellow" ? "yellow" : "circle"}></div>
          <div className={color == "green" ? "green" : "circle"}></div>
        </div>
        <div className="stand"></div>
      </div>
    </>
  );
};

export default TrafficLight;
