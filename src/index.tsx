import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Reset } from 'styled-reset'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import SignIn from "./pages/sign-in/SignIn";

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <BrowserRouter>
      <Routes>
        <Route path={"/sign-in"} element={<SignIn />}/>
        <Route path={"/"} element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
