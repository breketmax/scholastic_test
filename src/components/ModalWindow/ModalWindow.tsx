import React from 'react';
import {IModalWindow} from "../../types/types";
import closeIcon from "../../assets/close-icon.svg"
import "./ModalWindow.css"
const ModalWindow:React.FC<IModalWindow> = ({title,close,body,footer,closeModal}) => {
    return (
        <div className="modal-window-overflow" onClick={closeModal}>
            <div className="modal-window" onClick = {(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {title}
                    {close && <button onClick={closeModal}><img src={closeIcon} alt="close-icon" /></button>}
                </div>
                <div className="modal-body">
                    {body}
                </div>
                <div className="modal-footer">
                    {footer}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;