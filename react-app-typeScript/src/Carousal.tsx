import React, { useState } from "react";
import useImgaes from "./useImgaes";
import "./App.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";

function Carousal({ data }) {
  // const { data, loading, err } = useImgaes("http://localhost:3000/images");

  const [pg, setPg] = useState<number>(0);

  // if (loading) return <p>Loading...</p>;
  // if (err) return <p>Error {err}</p>;

  // if (!data) return null;

  return (
    <>
      <div className="carosal">
        <div className="maindiv">
          {data ? <img src={data[pg]?.src} alt="" /> : null}
        </div>
        <div className="next">
          <button
            onClick={() => {
              pg == data.length - 1 ? setPg(0) : setPg((prev) => prev + 1);
            }}
          >
            <MdNavigateNext />
          </button>
        </div>
        <div className="prev">
          <button
            onClick={() => {
              pg == 0 ? setPg(data.length - 1) : setPg((prev) => prev + 1);
            }}
          >
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
