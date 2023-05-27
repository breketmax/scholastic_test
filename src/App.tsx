import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Header/>
              <Outlet/>
          </div>
      </Provider>
  );
}

export default App;
