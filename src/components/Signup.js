import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../actions/auth";

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

const Signup = (props) => {
  const name = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      dispatch(
        signup({
          name: name.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
        })
      );
    }
  };

  const { error, inProgress ,isLoggedIn} = props.auth;
  if(isLoggedIn){
    return <Redirect to='/home' />;
  }
  return (
    <div className="form-container">
      <form className="login-form" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form-logo"></div>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <i className="far fa-user"></i>
          <input type="text" placeholder="Username" required {...name} />
        </div>

        <div className="field">
          <i className="far fa-envelope"></i>
          <input type="email" placeholder="Email" required {...email} />
        </div>
        <div className="field">
          <i className="fas fa-unlock-alt"></i>
          <input
            type="password"
            placeholder="Password"
            required
            {...password}
          />
        </div>
        <div className="field">
          <i className="fas fa-unlock-alt"></i>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            {...confirmPassword}
          />
        </div>
        <div className="form-button">
          {inProgress ? (
            <button type="submit" disabled={inProgress}>
              Signing Up...
            </button>
          ) : (
            <button type="submit" disabled={inProgress}>
              Sign Up
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Signup);
