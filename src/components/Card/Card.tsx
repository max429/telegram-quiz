import React, {FC, useState} from 'react';
import './Card.css';

interface IProps {
    question?: string;
    variants?: string[];
    setAnswer: (answer: number) => void;
    answer: number;
    error: boolean;
    index: number;
}

const Card: FC<IProps> = ({question, variants, setAnswer, answer, error, index}) => {
    return (
        <div className={'card'}>
            <div className={'card_question'}>{index + 1}. {question}</div>
            {variants?.map((item, index) => {
                const selectedAnswer = index === answer;
                return (
                    <div key={index}
                         className={'card_variant' + (selectedAnswer ? ' selected' : '') + (error && selectedAnswer ? ' error' : '')}
                         onClick={() => {
                        setAnswer(index);
                    }}>{item}</div>)
            })}
        </div>
    )
}

export default Card;
