import React, {useRef, useState} from 'react';
import "./IconInput.css"
import {IIconInput} from "../../../types/types";
import clearIcon from "../../../assets/close-icon.svg"
const IconInput:React.FC<IIconInput> = ({iconAction,placeholder,onChange,value,icon,clearInput}) => {
    const [isFocus,setFocus] = useState(false)
    const el = useRef<HTMLInputElement>(null)
    const toggleBlur = () => {
        setFocus(prevState => !prevState)
    }
    const handleKeyboard = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            iconAction()
            el.current?.blur()
        }
    }
    return (
        <div className={["breketmax-icon-input",isFocus ? "focus" : ''].join(" ")}>
            <button className="input-icon" onClick={iconAction}>
                {icon}
            </button>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={toggleBlur}
                onBlur={toggleBlur}
                onKeyDown={handleKeyboard}
                ref={el}
            />
            { value.length > 0 &&
                <button className="clear-input-icon" onClick={clearInput}>
                    <img src={clearIcon}/>
                </button>
            }
        </div>
    );
};

export default IconInput;