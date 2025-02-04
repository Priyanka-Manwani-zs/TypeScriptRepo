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
  const [showButtons, setShowButtons] = useState<number[]>([]);
  const [pg, setPg] = useState<number>(1);

  const fetchImages = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=150");
    const data = await response.json();
    setArr(data.products);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const PagesNumber: number = Math.ceil(arr.length / 10);

  const generateButtons = () => {
    let buttons: number[] = [];
    if (PagesNumber <= 5) {
      for (let i = 1; i <= PagesNumber; i++) {
        buttons.push(i);
      }
    } else {
      if (pg <= 3) {
        buttons = [1, 2, 3, 4, 5];
      } else if (pg >= PagesNumber - 2) {
        buttons = [
          PagesNumber - 4,
          PagesNumber - 3,
          PagesNumber - 2,
          PagesNumber - 1,
          PagesNumber,
        ];
      } else {
        buttons = [pg - 2, pg - 1, pg, pg + 1, pg + 2];
      }
    }
    setShowButtons(buttons);
  };

  useEffect(() => {
    generateButtons();
  }, [pg, PagesNumber]);

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
        <button onClick={() => setPg(1)}>
          <BiFirstPage />
        </button>

        <button
          onClick={() => setPg((prev) => (prev > 1 ? prev - 1 : PagesNumber))}
        >
          <GrFormPrevious />
        </button>

        {showButtons.map((btn, key) => (
          <button
            key={key}
            onClick={() => setPg(btn)}
            className={btn === pg ? "fill" : "notfill"}
          >
            {btn}
          </button>
        ))}

        <button
          onClick={() => setPg((prev) => (prev < PagesNumber ? prev + 1 : 1))}
        >
          <MdNavigateNext />
        </button>

        <button onClick={() => setPg(PagesNumber)}>
          <MdLastPage />
        </button>
      </div>
    </div>
  );
}

export default App;
