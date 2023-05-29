import React, {useEffect, useState} from 'react';
import BMLogo from "../../assets/bm.png"
import "./Header.css";
import IconInput from "../UI/IconInput/IconInput";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setSearchingQuery} from "../../store/slices/ProductsSlice";
import searchIcon from "../../assets/search.svg"
import {useLocation, useNavigate, useParams} from "react-router-dom";
const Header:React.FC = () => {
    const [searchValue,setSearchValue] = useState("")
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const params = useParams()
    const searchByParams =() => {
        if(searchValue){
            navigate(`?search=${searchValue}`)
        }else{
            navigate(`/`)
        }
        dispatch(setSearchingQuery(searchValue))
    }

    const clearSearchQuery = () => {
        setSearchValue("")
        dispatch(setSearchingQuery(""))
        navigate(`/`)
    }
    const {search} = useLocation();
    useEffect(() => {
        const searchUrl = search.match(/search=(\d+|\w+)/m)
        if(searchUrl && !searchValue){
            setSearchValue(searchUrl[1])
            dispatch(setSearchingQuery(searchUrl[1]))
        }
    },[search])

    return (
        <div className="app-header">
            <div className="container">
                <div className="app-header-content">
                   <img src={BMLogo} alt="breketmax-logo"/>
                    {!params.productId && <IconInput
                        placeholder={"Search"}
                        clearInput={clearSearchQuery}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        value={searchValue}
                        iconAction={searchByParams}
                        icon={<img src={searchIcon} alt="search-icon" />}
                    />}

               </div>
            </div>
        </div>
    );
};

export default Header;