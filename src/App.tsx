import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes, useNavigate } from "react-router-dom";
import RestaurantList from "~/pages/restaurant/list/RestaurantList";
import RestaurantDetail from "~/pages/restaurant/detail/RestaurantDetail";
import SignIn from "./pages/sign-in/SignIn";
import { useLocation } from "react-router";
import LookupRestaurantBest from "~/pages/lookup/restaurant/best/LookupRestaurantBest";
import EventDetail from "~/pages/event/EventDetail";
import EventList from "~/pages/event/EventList";

interface JwtToken {
  email: string
  memberId: number
  nickname: string
  exp: number
  lat: number
}

const App = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    // const token = localStorage.getItem('token')
    //  TODO : JWT Decode
    // if (token) {
    //   const jwt: JwtToken = jwtDecode(token)
    // } else {
    //   navigate('/sign-in')
    // }
  }, [  ])

  useEffect(() => {
    if (pathname === '/') {
      navigate("/restaurant")
    }
  }, [ pathname ])

  return (
    <div className="app">
      <Routes>
        <Route path={"/sign-in"} element={<SignIn />}/>
        <Route path={"/lookup/restaurant/best"} element={<LookupRestaurantBest />} />
        <Route path={"/restaurant/:id"} element={<RestaurantDetail />} />
        <Route path={"/restaurant"} element={<RestaurantList />} />
        <Route path={"/event/create"} element={<EventDetail />} />
        <Route path={"/event/:id"} element={<EventDetail />} />
        <Route path={"/event"} element={<EventList />} />
      </Routes>
    </div>
  );
}

export default App;
