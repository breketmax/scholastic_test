import React from 'react';
import "./Loader.css"
import loader from "../../assets/loader.gif"
const Loader:React.FC<{type?: "page" | "local"}> = ({type = "page"}) => {
    return (
        <div className={["loader-wrapper",type].join(" ")} >
            <img src={loader} alt="loader "/>
        </div>
    );
};

export default Loader;