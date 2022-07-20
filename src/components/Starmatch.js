import React, { useState } from 'react'
import PlayNumber from './PlayNumber'
import './Style.css'
import Stars from './Stars'
import { utils } from './Utils'
import {PlayAgain}from './PlayAgain'

export default function StarMatch() {
  // const arr=[1,2,3,4,5,6,7,8,9]
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameIsDone = availableNums.length === 0;


  // const [btnColor,setBtnColor]=useState("grey")
  const onNumberChange = (number, currentStatus) => {
    if (currentStatus === 'used') {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }
  const statusChange = (item) => {

    if (!availableNums.includes(item)) {
      return "used"
    }
    if (candidateNums.includes(item)) {
      return candidatesAreWrong ? "wrong" : "candidate"
    }
    return "available"

  }

  const resetGame=()=>{
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9))
    setCandidateNums([])
  }
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameIsDone ?   
           	
            <PlayAgain onClick={resetGame} /> 
            : <Stars stars={stars} />}

        </div>
        <div className="right">
          {utils.range(1, 9).map((item) => {
            return (
              <div key={item}>
                <PlayNumber onNumberClicked={onNumberChange}
                  item={item} status={statusChange(item)} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>

  )
}
