import React, {useState} from 'react';
import './App.css';
import {Button, Card} from "./components";
declare global {
  interface Window {
    Telegram:any;
  }
}
const tg = window.Telegram.WebAp

function App() {
  console.log('tg', tg);
  const answers = [0, 1];
  const [userAnswers, setUserAnswers] = useState(Array(answers.length).fill(-1));
  const [errorIndices, setErrorIndices] = useState<number[]>([])
    const [gameIsOver, setGameIsOver] = useState(false);
  const questions = [{
    question: 'What kind of smoker was John?',
    variants: ['He only smoked at social events',
      'He smoked a pack a day.',
      'He was suffering from emphysema',
      ' He had never smoked a cigarette in his life'],
  }, {
    question: 'How did John get rid of his splitting headache?',
    variants: ['The doctor cured him.', 'He took pain relievers', 'He used his inhaler', 'The nurse massaged his forehead'],
  }];
  return (
    <div className="App">
      {questions.map((item, index) => {
        return ( <Card key={index}
                       error={errorIndices.includes(index)}
                       question={item.question}
                       variants={item.variants}
                       answer={userAnswers.length >= index ? userAnswers[index] : -1}
                       setAnswer={(answer: number) => {
          setUserAnswers((oldAnswers) => {
             const newAnswers: any = [...oldAnswers];
             newAnswers[index] = answer;
             return newAnswers;
          })
        }}/>)
      })}

        {!gameIsOver ? <Button text={'Check'} onClick={() => {
          const errors = [];
          for (let i = 0; i < answers.length; i++) {
            if (answers[i] !== userAnswers[i]) {
              errors.push(i);
            }
          }
          setErrorIndices(errors);
          setGameIsOver(true);
      }} disabled={userAnswers.some((item) => item === -1)}/> :
      <Button text={'Try Again'} onClick={() => {
         setUserAnswers(Array(answers.length).fill(-1));
         setErrorIndices([]);
         setGameIsOver(false);
      }}/>}
    </div>
  );
}

export default App;
