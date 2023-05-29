import React, {useEffect} from 'react';
import TextButton from "../UI/TextButton/TextButton";
import {Link, useNavigate} from "react-router-dom";
import errorLogo from "../../assets/sad-route.svg"
import "./ErrorView.css"

const ErrorView:React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        },5000)
    },[])
    return (
        <div className="container">
        <div className="error-page">
            <div className="error-img">
                <img  src={errorLogo} alt="error-icon"/>
            </div>
            <h2>
                Oops...
            </h2>
            <p>
                Where are you? Please get out from this page as fast as you can, because idk what will happen after 5 sec...
            </p>
            <Link to={"/"}>
                <TextButton text={"Sure"} size={"lg"} type={"filled"}/>
            </Link>
        </div>
        </div>
    );
};

export default ErrorView;