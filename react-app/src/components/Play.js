import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Play extends Component {
  constructor() {
    super();
    this.state = {
        // flag: '1',
        data: [],
        submitted: 'false',
    }
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  
  componentDidMount() {
      const request = new Request('http://127.0.0.1:8080/viewquiz');
      fetch(request)
      .then(response => response.json())
      .then(data => this.setState({data: data}));
    }
    
    
render(){
    // const email=UserProfile.getEmail();
    const email=localStorage.getItem("email");
    if( email != "")
    {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">QUIZZES</h1>
            </header>
            <form>
            <table className="table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Type</th>
                    <th>Select</th>
                </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {
                 return (
                    <tr key = {key}>
                         <td>{item.id}</td>
                         <td>{item.name}</td>
                         <td>{item.genre}</td>
                         <td>{item.type}</td>
                         <td><Link to={'/PlayQuiz/'+item.id}>Play</Link></td>
                    </tr>
                 )
                })} 
            </tbody>
            </table>
    </form>
    </div>
    );
    }
    else
    {
        return(
            <div className="err">
                <h2>YOU NEED TO LOGIN FIRST</h2>
            </div>
        )
    }
  
}
}
export default Play;
