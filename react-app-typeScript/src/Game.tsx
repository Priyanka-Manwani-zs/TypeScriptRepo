import { useEffect, useState } from "react";
import "./App.css";
import { generate, count } from "random-words";
const Game: React.FC = () => {
  const [word, setWord] = useState("Pripa");
  const [over, setOver] = useState<Boolean>(false);
  const [win, setWin] = useState<Boolean>();
  const randomWords = generate(7);
  console.log(randomWords);

  // useEffect(() => {
  //   const index = Math.floor(Math.random() * randomWords.length);
  //   const randomWord = randomWords[index];
  //   setWord(randomWord);
  // }, [win, over]);
  // let wordArr: string[];
  // if (word.length > 0) {
  //   wordArr = word.toLowerCase().split("");
  // }
  let wordArr: string[] = word.toUpperCase().split("");
  console.log(word);

  const [input, setInput] = useState<String>("");
  const [pos, setPos] = useState<number>(0);
  const [correct, setCorrect] = useState<Boolean>(false);
  const [wrong, setWrong] = useState<Boolean>(false);
  const [wrongPos, setWrongPos] = useState<Boolean>(false);
  const [place, setPlace] = useState<string[]>([]);
  const [lives, setLives] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(5);

  useEffect(() => {
    if (input.length <= 0) {
      setCorrect(false);
      setWrong(false);
      setWrongPos(false);
    }
  }, [input]);

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
        if (place.includes(wordArr[i])) {
          place[pos] = wordArr[i];
          setPos((prev) => prev + 1);
          setCorrect(true);
          setWrong(false);
          setWrongPos(false);
          return;
        }
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
      setLives((prev) => prev.slice(0, prev.length - 1));
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
    setPos(0);
  }
  console.log("printed", place);
  console.log("input", wordArr);
  console.log("ind", lives.splice(lives.length));
  //   console.log("moves", moves);
  console.log("input", input.length);

  useEffect(() => {
    const initialLives = new Array(moves).fill("❤️");
    setLives(initialLives);
  }, [moves]);

  console.log(lives);

  return (
    <>
      <div className="maindiv">
        <div className="lives">
          {lives.map((life, index) => {
            return <div className="moves">{life}</div>;
          })}
        </div>

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
          placeholder="Enter a letter"
          maxLength={1}
          className="input"
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
