import React, { useEffect } from 'react';
import './App.scss';
import { SideBar } from "./component";
import { Route, Routes } from "react-router-dom";
import RestaurantList from "./pages/restaurant/RestaurantList";
import { useNavigate } from "react-router-dom"

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    //  TODO : JWT Decode

    navigate('/sign-in')
  }, [  ])

  return (
    <div className="app">
      <SideBar />
      <Routes>
        <Route path={'/'} element={<RestaurantList />}/>
      </Routes>
    </div>
  );
}

export default App;
