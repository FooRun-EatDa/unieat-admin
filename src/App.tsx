import React from 'react';
import './App.scss';
import SideBar from "./component/Sidebar/SideBar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import RestaurantList from "./pages/restaurant/RestaurantList";

const App = () => {
  return (
    <div className="app">
      <SideBar />
      <Routes>
        {/*<Route path={'/login'} element={<Login />}/>*/}
        <Route path={'/'} element={<RestaurantList />}/>
      </Routes>
    </div>
  );
}

export default App;
