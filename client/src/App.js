import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/pages/Login";
import Restaurants from "./components/pages/Restaurants";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <h1>HEllo guys</h1>
    </div>
  );
}

export default App;
