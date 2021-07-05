import React, { Component } from "react";
import { Link} from "react-router-dom";
import "../assets/css/Login-Signup.css";

class Signup extends Component {
  render() {
    return (
      <div className="form-container">
        <form className="login-form">
          <div className="form-logo"></div>
          <div className="field">
            <i class="far fa-user"></i>
            <input type="text" placeholder="Username" required />
          </div>

          <div className="field">
            <i class="far fa-envelope"></i>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="field">
            <i class="fas fa-unlock-alt"></i>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="field">
            <i class="fas fa-unlock-alt"></i>
            <input type="confirmPassword" placeholder="Confirm Password" required />
          </div>
          <div className="form-button">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
