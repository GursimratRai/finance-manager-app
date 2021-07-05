import React, { Component } from "react";
import { Link} from "react-router-dom";
import "../assets/css/Login-Signup.css";

class Login extends Component {
  render() {
    return (
      <div className="form-container">
        <form className="login-form">
          <div className="form-logo">{/* <img src='' */}</div>
          <div>
            <h2>Welcome Back</h2>
          </div>
          <div className="field">
            <i class="far fa-envelope"></i>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="field">
            <i class="fas fa-unlock-alt"></i>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="form-button">
            <button>Log In</button>
          </div>
        </form>
        <div className="login-form">
          Don't have an acccout?<Link to='/signup' >SignUp</Link>
        </div>
      </div>
    );
  }
}

export default Login;
