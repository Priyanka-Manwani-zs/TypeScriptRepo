import { useState } from "react";
import "./App.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";

function Carousal({ data }:any) {
  const [pg, setPg] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<string>("");

  const handleNext = () => {
    setAnimationDirection("next");
    pg == data.length - 1 ? setPg(0) : setPg((prev) => prev + 1);
  };

  const handlePrev = () => {
    setAnimationDirection("prev");
    pg == 0 ? setPg(data.length - 1) : setPg((prev) => prev - 1);
  };

  return (
    <>
      <div className="carosal">
        <div className="maindiv">
          {data ? (
            <img
              className={`carousel-image ${animationDirection}`}
              src={data[pg]?.src}
              alt=""
              onAnimationEnd={() => setAnimationDirection("")}
            />
          ) : null}
        </div>
        <div className="next">
          <button onClick={handleNext}>
            <MdNavigateNext />
          </button>
        </div>
        <div className="prev">
          <button onClick={handlePrev}>
            <GrFormPrevious />
          </button>
        </div>
        <div className="dot">
          {data.map((_:any, key) => {
            return <GoDotFill key={key} color={pg == key ? "red" : "white"} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Carousal;
