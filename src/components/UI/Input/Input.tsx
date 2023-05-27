import React from 'react';
import "./Input.css"
import {IInput} from "../../../types/types";

const Input:React.FC<IInput> = ({placeholder,onChange,value}) => {
    return (
        <div className="breketmax-input">
            <input type="text" placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    );
};

export default Input;