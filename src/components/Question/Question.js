import React, { useState } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import "./Question.css"
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Question = ({currentQuestion,setCurrentQuestion,questions,options,correct,score,setScore}) => {

  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelect = (i) => {
    if(selected ===i && selected ===correct) {
      return "select";
    }
    else if (selected===i && selected !== correct){
      return "wrong";
    }
    else if (i=== correct) {
      return "select";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score +1);
    setError(false);
  };

  const navigate = useNavigate();

  const handleNext = () => {
    if(currentQuestion > 8) {
      navigate("/result");
    }
    else if (selected) {
      setCurrentQuestion(currentQuestion +1)
      setSelected()
    }
    else {
      setError("Please select an option first");
    }
  };

  const handleQuit = () => {};

  return (
    <div className='question'>

    <h1>Question {currentQuestion + 1}</h1>

    <div className='singleQuestion'>

    <h2>{questions[currentQuestion]. question}</h2>

    <div className='options'>
      {error && <ErrorMessage>Please Fill all fields</ErrorMessage>}
        {
          options &&
          options.map(i => (
            <button onClick={() => handleCheck(i)}
            className={`singleOption ${selected && handleSelect(i)}`}
            key={i}
            disabled={selected}
            >
              {i}
            </button>
          ))
        }
        </div>

        <div className='controls'>
          <Button variant='contained' color='secondary' size='large' style={{width: 185}} href="/" onClick={handleQuit}>Quit</Button>
          <Button variant='contained' color='primary' size='large' style={{width: 185}} onClick={handleNext}>Next Question</Button>

        </div>

    </div>
    </div>
  )
}

export default Question
