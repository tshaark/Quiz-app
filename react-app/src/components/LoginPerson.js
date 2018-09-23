import React, { Component } from 'react';
import './LoginPerson.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';


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


handleSubmit(event) {
    // alert('An email and password was submitted: '+ this.state.email + this.state.password);
    event.preventDefault();
    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          // console.log('BOndBagwal')
          UserProfile.setEmail(this.state.formData.email);
          this.context.router.history.push("/Profile");
          this.setState({submitted: true});
      });
  }

  render() {

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
}

export default LoginPerson;
