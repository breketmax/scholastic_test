import React from 'react';
import "./Textarea.css"
import {ITextarea} from "../../../types/types";

const Textarea:React.FC<ITextarea> = ({placeholder,onChange,value}) => {
    return (
        <div className="breketmax-textarea">
            <textarea  placeholder={placeholder} value={value} onChange={onChange} rows={10}/>
        </div>
    );
};

export default Textarea;