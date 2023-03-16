import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Card, Loading} from "./components";
import {checkStoryAnswers, fetchStoryWithTestById} from "./requests/app";
declare global {
  interface Window {
    Telegram:any;
  }
}
interface IQuestion {
  question?: string;
  variants?: string[];
}

function App() {
  const answers = [0, 1];
  const [userAnswers, setUserAnswers] = useState(Array(answers.length).fill(-1));
  const [errorIndices, setErrorIndices] = useState<number[]>([])
  const [gameIsOver, setGameIsOver] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoryWithTestById('story1').then((data) => {
      setQuestions(data.testQuestions)
    }).finally(() => {
        setLoading(false);
    })
  }, [])

  return (
    <div className={'App'}>
      {loading ? <Loading/> : <>
        {questions.map((item, index) => {
          return ( <Card key={index}
                         index={index}
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
        {!gameIsOver ? <Button text={'Check4'} onClick={() => {
              checkStoryAnswers('story1', userAnswers).then(({errorIndices}) => {
                setErrorIndices(errorIndices);
                setGameIsOver(true);
              })
            }} disabled={userAnswers.some((item) => item === -1)}/> :
            <Button text={'Try Again'} onClick={() => {
              setUserAnswers(Array(answers.length).fill(-1));
              setErrorIndices([]);
              setGameIsOver(false);
            }}/>}
      </>}
    </div>
  );
}

export default App;
