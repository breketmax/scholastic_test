import React from 'react';
import {ITextButton} from "../../../types/types";
import "./TextButton.css"

const TextButton:React.FC<ITextButton> = ({text,onClick,type="outline",size="md",children}) => {

    return (
        <div className="button-wrapper">
            <button className={[`breketmax-text-button`,type,size].join(" ")} onClick={onClick}>
                {children}
                {text}
            </button>
        </div>
    );
};

export default TextButton;