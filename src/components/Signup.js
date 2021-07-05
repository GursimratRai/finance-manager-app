import React, { useState } from "react";
import "../assets/css/Login-Signup.css";

function useFormInput(initialValue) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

function handleFormSubmit(e){
  e.preventDefault();
}

function Signup() {
  const name = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");

  return (
    <div className="form-container">
      <form className="login-form">
        <div className="form-logo"></div>
        <div className="field">
          <i class="far fa-user"></i>
          <input type="text" placeholder="Username" required {...name} />
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
        <div className="field">
          <i class="fas fa-unlock-alt"></i>
          <input
            type="confirmPassword"
            placeholder="Confirm Password"
            required
            {...confirmPassword}
          />
        </div>
        <div className="form-button">
          <button onClick={handleFormSubmit}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
