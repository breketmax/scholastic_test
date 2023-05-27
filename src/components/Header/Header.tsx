import React from 'react';
import BMLogo from "../../assets/bm.png"
import "./Header.css";
const Header:React.FC = () => {
    return (
        <div className="app-header">
            <div className="container">
                <div className="app-header-content">
                   <img src={BMLogo} alt="breketmax-logo"/>
                   <span>
                   Инпут
                   </span>
               </div>
            </div>
        </div>
    );
};

export default Header;