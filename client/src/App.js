import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import SingleRestaurant from "./components/pages/SingleRestaurant";
import Restaurants from "./components/pages/Restaurants";
import AddReview from "./components/AddReview";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/Layout";
import Login from "./components/pages/Login";

function App() {
  const [user, setUser] = useState({});

  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/restaurants/:id/review"
            element={<AddReview user={user} />}
          />
          <Route path="/restaurants/:id" element={<SingleRestaurant />} />
          <Route path="/restaurants" element={<Restaurants user={user} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
