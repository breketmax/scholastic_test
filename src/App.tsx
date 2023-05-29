import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Outlet} from "react-router-dom";
import {tempData} from "./helpers/constants";
import {setItems} from "./store/slices/ProductsSlice";
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks";

function App() {
    const dispatch = useAppDispatch()
    const {items} = useAppSelector(state => state.products)
    useEffect(() => {
        if(!localStorage.items){
            localStorage.items = JSON.stringify(tempData)
        }
        dispatch(setItems(localStorage.items))
    },[])

    useEffect(() => {
        localStorage.items = JSON.stringify(items)
    },[items])
  return (
          <div className="App">
              <Header/>
              <Outlet/>
          </div>
  );
}

export default App;
