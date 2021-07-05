import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Login-Signup.css";

function useFormInput(initialValue) {
  const [ value, setValue ] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

function Login() {
  const email = useFormInput("");
  const password = useFormInput("");

  return (
    <div className="form-container">
      <form className="login-form">
        <div className="form-logo"></div>
        <div>
          <h2>Welcome Back</h2>
        </div>
        <div className="field">
          <i class="far fa-envelope"></i>
          <input type="email" placeholder="Email" required {...email} />
        </div>
        <div className="field">
          <i class="fas fa-unlock-alt"></i>
          <input
            type="password"
            placeholder="Password"
            required
            {...password}
          />
        </div>
        <div className="form-button">
          <button>Log In</button>
        </div>
      </form>
      <div className="login-form">
        <div>
          Don't have an acccout?{" "}
          <Link className="signup" to="/signup">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
