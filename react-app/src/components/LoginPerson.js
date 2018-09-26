import React, { Component } from 'react';
import './LoginPerson.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
import { GoogleLogin } from 'react-google-login';


class LoginPerson extends Component {
  constructor() {
    super();
    this.state= {
      formData: {
        email: '',
        password: '',
      },
    submitted: false,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

static contextTypes ={
  router: PropTypes.object,
}
handleEmailChange(event){
  this.state.formData.email =  event.target.value;
}
handlePassChange(event){
  this.state.formData.password =  event.target.value;
}
logout=()=>{
  localStorage.clear();
  this.context.router.history.push("/LoginPerson");
}
responseGoogle = (response) => {
  // UserProfile.setEmail(response.w3.U3);
  localStorage.setItem("email",response.w3.U3);
  // UserProfile.setPassword("lassan");
  this.context.router.history.push("/play")

}

handleSubmit(event) {
      // alert('An email and password was submitted: '+ this.state.formData.email + this.state.formData.password);
    event.preventDefault();
    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          console.log('BOndBagwal')
          // UserProfile.setEmail(this.state.formData.email);
          localStorage.setItem("email",this.state.formData.email);
          this.context.router.history.push("/Play");
          this.setState({submitted: true});
      });
  }

  render() {
    if(localStorage.getItem("email") == null)
    {
    return (
      <div className="App">
      <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input name="email" type="text" className="form-control" value={this.state.email} required="required" onChange={this.handleEmailChange}/>
              <label>Email</label>
              <div className="bar"/>
            </div>
            <div className="form-group">
              <input name="password" type="password" className="form-control" value={this.state.password}  required="required" onChange={this.handlePassChange}/>
              <label>Password</label>
              <div className="bar"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
            <br></br>
            <br></br>
            <GoogleLogin
                clientId="1018147983310-b339ocvqlaqrg3smchub06119n4f5roe.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}>
            </GoogleLogin>
            <div className="footer"><a href="#">Forgot your password?</a></div>
          </form>
        </div>
        {this.state.submitted &&
          <div>
            <h2>
              New person logged in.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
        </div>
     
    );
      }
    else{
      return(
        <div>
        <h2>Someone is already logged in.</h2>
        <button onClick={this.logout}>LOG OUT</button>
        </div>

      );
    }
  }
}

export default LoginPerson;
