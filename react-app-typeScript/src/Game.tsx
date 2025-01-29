import { useEffect, useState } from "react";
import "./App.css";
import { generate, count } from "random-words";
const Game: React.FC = () => {
  const [word, setWord] = useState("");
  const randomWords = generate(7);
  console.log(randomWords);

  useEffect(() => {
    const index = Math.floor(Math.random() * randomWords.length);
    const randomWord = randomWords[index];
    setWord(randomWord);
  }, []);
  // let wordArr: string[];
  // if (word.length > 0) {
  //   wordArr = word.toLowerCase().split("");
  // }
  let wordArr: string[] = word.toUpperCase().split("");
  console.log(word);

  const [input, setInput] = useState<String>("");
  const [pos, setPos] = useState<Number>(0);
  const [correct, setCorrect] = useState<Boolean>(false);
  const [wrong, setWrong] = useState<Boolean>(false);
  const [wrongPos, setWrongPos] = useState<Boolean>(false);
  const [place, setPlace] = useState<string[]>([]);
  const [over, setOver] = useState<Boolean>(false);
  const [moves, setMoves] = useState<Number>(5);
  const [win, setWin] = useState<Boolean>();

  function CheckWord(e: React.ChangeEvent<HTMLInputElement>): void {
    if (pos == wordArr.length) {
      setWin(true);
      return;
    }
    if (moves == 0) {
      setOver(true);
      return;
    }
    let value = e.target.value.toUpperCase();

    console.log(value);

    setInput(value);
    if (value === "") {
      return;
    }

    let matchFound = false;

    for (let i = 0; i < wordArr.length; i++) {
      if (value === wordArr[i]) {
        matchFound = true;
        if (pos === i) {
          setPos((prev) => prev + 1);
          setCorrect(true);
          setWrong(false);
          setWrongPos(false);
          setPlace((prev) => [...prev, wordArr[i]]);
        } else {
          setCorrect(false);
          setWrong(false);
          setWrongPos(true);
        }
        return;
      }
    }

    if (!matchFound) {
      console.log("wrong Letter");
      setWrong(true);
      setWrongPos(false);
      setCorrect(false);
      setMoves((prev) => prev - 1);
    }
  }

  function HandleRestart(): void {
    setMoves(5);
    setOver(false);
    setWin(false);
    setWrong(false);
    setWrongPos(false);
    setCorrect(false);
    setInput("");
    setPlace([]);
  }
  //   console.log("printed", place);
  //   console.log("input", arr);
  //   console.log("moves", moves);
  return (
    <>
      <div className="maindiv">
        <div className="moves">Moves Left : {moves}</div>
        <div className="display">
          {wordArr.length > 0 &&
            wordArr.map((char, index) => {
              return (
                <div className="char" key={index}>
                  <div>{place[index] ? place[index] : ""}</div>
                </div>
              );
            })}
        </div>

        <input
          type="text"
          value={input}
          onChange={CheckWord}
          placeholder="Enter a word"
          maxLength={1}
        />

        {correct ? (
          <p className="succes">yay! u got it right 💃</p>
        ) : wrongPos ? (
          <p className="partialSucess">Letter is correct , but wrong pos 🧐</p>
        ) : wrong ? (
          <p className="wrong">oops, you loose one move!😕</p>
        ) : null}
      </div>
      {over && (
        <div className="overDiv">
          <div>
            <div className="gameOver">
              <p>oops! you are out of moves</p>
              <button onClick={HandleRestart}>Try Again</button>
            </div>
          </div>
        </div>
      )}
      {win && (
        <div className="overDiv">
          <div>
            <div className="gameWin">
              <p>congratulations! You did it..🥳</p>
              <button onClick={HandleRestart}>Play Again</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
