import React from 'react';
import {ITextButton} from "../../../types/types";
import "./TextButton.css"

const TextButton:React.FC<ITextButton> = ({text,onClick,type="outline",size="md",children,disabled}) => {

    return (
        <div className="button-wrapper">
            <button className={[`breketmax-text-button`,type,size].join(" ")} onClick={onClick} disabled={disabled}>
                {children}
                {text}
            </button>
        </div>
    );
};

export default TextButton;