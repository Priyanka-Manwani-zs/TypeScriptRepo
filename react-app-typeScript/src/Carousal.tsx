import React, { useState } from "react";
import useImgaes from "./useImgaes";
import "./App.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";

function Carousal() {
  const { data, loading, err } = useImgaes("http://localhost:3000/images");

  const [pg, setPg] = useState<number>(0);

  if (loading) return <p>Loading...</p>;
  if (err) return <p>Error {err}</p>;

  if (!data) return null;

  return (
    <>
      <div>
        <div className="maindiv">
          <div className="images">
            {data ? <img src={data[pg]?.src} alt="" /> : null}
          </div>
        </div>
        <div className="next">
          <button onClick={() => setPg((prev) => prev + 1)}>
            <MdNavigateNext />
          </button>
        </div>
        <div className="prev">
          <button onClick={() => setPg((prev) => prev + 1)}>
            <GrFormPrevious />
          </button>
        </div>
        <div className="dot">
          {" "}
          {data.map((ele, key) => {
            return <GoDotFill key={key} color={pg == key ? "red" : "white"} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Carousal;
