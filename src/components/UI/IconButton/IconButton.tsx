import React from 'react';
import {IIconButton} from "../../../types/types";
import "./IconButton.css"

const IconButton:React.FC<IIconButton> = ({children,onClick}) => {

    return (
        <div className="button-wrapper">
            <button className={[`breketmax-icon-button`].join(" ")} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default IconButton;