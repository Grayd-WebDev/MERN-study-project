import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const loginUser = () => {
    props.login(user);
    navigate("/restaurants", { replace: true, state: user });
  };
  return (
    <div>
      <div className="login-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            placeholder="User name"
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            placeholder="Id goes here"
            onChange={handleInputChange}
            name="id"
          />
        </div>
        <button onClick={loginUser} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
