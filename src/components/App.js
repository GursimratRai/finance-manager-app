import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import {Login,Signup} from './';

class App extends Component {
  render() {
    return (
      <Router>
         <Route exact path='/' render = {()=>{return <Login /> }} />       
         <Route exact path='/signup' render = {()=>{return <Signup /> }} /> 
      </Router>
    );
  }
}

export default App;