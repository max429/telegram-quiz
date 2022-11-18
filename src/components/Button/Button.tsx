import React, {FC} from 'react';
import "./Button.css"

interface IProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const Button: FC<IProps> = ({text, onClick, disabled}) => {
    console.log(disabled)
    return (<button className={'btn' + (disabled ? ' disabled' : '')} disabled={disabled} onClick={onClick}>
        <span className={'btn_text'}>{text}</span>
    </button>)
}

export default Button;
