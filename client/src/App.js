import React from "react";
import { Route, Routes } from "react-router-dom";

import Restaurants from "./components/pages/Restaurants";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/Layout";
import Login from "./components/pages/Login";
import RestaurantsList from "./components/RestaurantsList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <h1>Main Page</h1>
    </div>
  );
}

export default App;
