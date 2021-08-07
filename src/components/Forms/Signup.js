import React from "react";
import { useDispatch, connect } from "react-redux";
import { Redirect } from "react-router-dom";

//Action for signing up / creating new account for the user
import { signup } from "../../actions/auth";

///Css file for styling
import "../../assets/css/Login-Signup.css";

//Custom React Hook for inputing form data and handling the change
import {useFormInput} from '../../helpers/utils';

//Sign Up form for creating new account
const Signup = (props) => {
  const name = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");
  const dispatch = useDispatch();
  const { error, inProgress ,isLoggedIn} = props.auth;
 
 //function for handling submission of the form
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

  //If user is already logging in redirect to home page instead of sign up page
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

//function for mapping the state to props which can then pass as an argument to the component
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

//connecting component to redux store
export default connect(mapStateToProps)(Signup);
