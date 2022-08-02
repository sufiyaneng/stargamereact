import React, { useEffect, useState } from "react";
import PlayNumber from "./PlayNumber";
import "./Style.css";
import Stars from "./Stars";
import { utils } from "./Utils";
import { PlayAgain } from "./PlayAgain";

export default function StarMatch() {
  // const arr=[1,2,3,4,5,6,7,8,9]
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [counter, setCounter] = useState(10);
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    availableNums.length === 0 ? "won" : counter === 0 ? "lost" : "active";

  useEffect(() => {
    console.log("Use effect called::");
    if (counter > 0) {
      const timer1 = setTimeout(() => {
        console.log("After 1 se");
        setCounter(counter - 1);
      }, 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  },[counter]);

  useEffect(()=>{
    console.log("Called due to changed in candidate arraysecond use effect");
  },[candidateNums,availableNums])

  // useEffect(()=>{
  //   console.log("Answer right");
  // },[availableNums])
  // const [btnColor,setBtnColor]=useState("grey")
  const onNumberChange = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    let newCandidateNums = [];
    if (currentStatus === "available") {
      newCandidateNums = candidateNums.concat(number);
    } else {
      newCandidateNums = candidateNums.filter((i) => i !== number);
    }
    // const newCandidateNums =
    //   currentStatus === 'available'
    //     ? candidateNums.concat(number)
    //     : candidateNums.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };
  const statusChange = (item) => {
    if (!availableNums.includes(item)) {
      return "used";
    }
    if (candidateNums.includes(item)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

    const resetGame = () => {
      setStars(utils.random(1, 9));
      setAvailableNums(utils.range(1, 9));
      setCandidateNums([]);
      setCounter(10)
    };
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={resetGame} gameStatus={gameStatus} />
          ) : (
            <Stars stars={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((item) => {
            return (
              <PlayNumber
                key={item}
                onNumberClicked={onNumberChange}
                item={item}
                status={statusChange(item)}
              />
            );
          })}
        </div>
      </div>
      <div className="timer">Time Remaining: {counter}</div>
    </div>
  );
}
