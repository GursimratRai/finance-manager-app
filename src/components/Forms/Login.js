import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

//Action for logging the user in
import { login } from "../../actions/auth";

//Css file for styling
import "../../assets/css/Login-Signup.css";

//Custom React Hook for inputing form data and handling the change
import { useFormInput } from "../../helpers/utils";

//Login Form
const Login = (props) => {
  const email = useFormInput("");
  const password = useFormInput("");
  const dispatch = useDispatch();
  const { error, inProgress, isLoggedIn } = props.auth;

  //Handling the submission of the form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email: email.value, password: password.value }));
    }
  };
  
  //If user is already logged in redirect to home instead of login page
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form-logo"></div>
        <div>
          <h2>Welcome Back</h2>
        </div>
        {error && <div className="alert error-dailog">{error}</div>}
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
        <div className="form-button">
          {inProgress ? (
            <button type="Submit" disabled={inProgress}>
              Logging In...
            </button>
          ) : (
            <button type="Submit" disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
      <div className="login-form">
        <div>
          Don't have an acccout?{" "}
          <Link className="signup" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

//function for mapping the state to props which can then pass as an argument to the component
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

//connecting component to redux store
export default connect(mapStateToProps)(Login);
