import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes, useNavigate } from "react-router-dom";
import RestaurantList from "~/pages/restaurant/RestaurantList";
import RestaurantDetail from "~/pages/restaurant/detail/RestaurantDetail";
import jwtDecode from "jwt-decode";
import SignIn from "./pages/sign-in/SignIn";

interface JwtToken {
  email: string
  memberId: number
  nickname: string
  exp: number
  lat: number
}

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    //  TODO : JWT Decode
    if (token) {
      const jwt: JwtToken = jwtDecode(token)
    } else {
      navigate('/sign-in')
    }
  }, [  ])

  return (
    <div className="app">
      <Routes>
        <Route path={"/sign-in"} element={<SignIn />}/>
        <Route path={"/restaurant/:id"} element={<RestaurantDetail />} />
        <Route path={"/restaurant"} element={<RestaurantList />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
