import { useEffect, useState } from "react";
import "./App.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { BiFirstPage } from "react-icons/bi";
import { MdLastPage } from "react-icons/md";

interface Product {
  id: number;
  title: string;

  images: string[];
}

function App() {
  const [arr, setArr] = useState<Product[]>([]);
  const [active, setActive] = useState<Boolean>(false);
  const [prevbuttons, setPrevButtons] = useState<Boolean>(false);
  const buttons: any[] = [];
  const [animation, setAnimation] = useState<string>("");

  const [pg, setPg] = useState<number>(1);

  const generateButtons = () => {
    for (let i = 1; i <= 10; i++) {
      buttons.push(i);
    }

    return buttons;
  };
  generateButtons();
  console.log(buttons);

  const fetchImages = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    setArr(data.products);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="maindiv">
      <div className="dashboard">
        {arr.slice(pg * 10 - 10, pg * 10).map((product) => (
          <div key={product.id} className="product">
            <img
              className="img"
              src={product.images[0]}
              alt={product.title}
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
            <span className="elipses">{product.title}</span>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            if (pg == 1) {
              setPg(10);
            } else {
              setPg(1);
            }
          }}
        >
          <BiFirstPage />
        </button>

        {pg > 1 && (
          <button
            onClick={() => {
              if (pg > 1) {
                setPg((prev) => prev - 1);
                if (pg == 6) {
                  setActive(false);
                  setPrevButtons(false);
                }
              } else {
                alert("you are on last page");
              }
            }}
          >
            <GrFormPrevious />
          </button>
        )}
        {buttons.map((btn, key) => {
          if (key <= 4) {
            return !prevbuttons ? (
              <button
                key={key}
                onClick={() => {
                  setPg(btn);
                }}
                className={key == pg - 1 ? "fill" : "notfill"}
              >
                {btn}
              </button>
            ) : (
              <p key={key} className="dots">
                .
              </p>
            );
          } else if (key >= 9) {
            return (
              <button
                key={key}
                onClick={() => {
                  setPg(btn);
                }}
                className={key == pg - 1 ? "fill" : "notfill"}
              >
                {btn}
              </button>
            );
          } else {
            return active ? (
              <button
                key={key}
                onClick={() => {
                  setPg(btn);
                }}
                className={key == pg - 1 ? "fill" : "notfill"}
              >
                {btn}
              </button>
            ) : (
              <p key={key}>.</p>
            );
          }
        })}

        <button
          onClick={() => {
            if (pg < 10) {
              setPg((prev) => prev + 1);
              if (pg == 5) {
                setActive(true);
                setPrevButtons(true);
              }
            } else {
              alert("you are on last page");
            }
          }}
        >
          <MdNavigateNext />
        </button>
        <button
          onClick={() => {
            if (pg == 10) {
              setPg(1);
            } else {
              setPg(10);
            }
          }}
        >
          <MdLastPage />
        </button>
      </div>
    </div>
  );
}

export default App;
