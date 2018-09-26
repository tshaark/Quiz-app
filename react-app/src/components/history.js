import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class history extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dataU: "",
            submitted: 'false',
        }
      }
      static contextTypes = {
        router: PropTypes.object,
      }

      componentDidMount() {
          
          // const email = UserProfile.getEmail();
          const email = localStorage.getItem("email");
        //   console.log(email)
          const requestU = new Request('http://127.0.0.1:8080/getusername/' + email);
          fetch(requestU)
          .then(response => response.json())
          .then(data => {
              this.setState({dataU: data})
              console.log(this.state.dataU.id);
              const request = new Request('http://127.0.0.1:8080/hist/' + this.state.dataU.id);
              fetch(request)
                .then(response => response.json())
                  .then(data => this.setState({data: data}));  
            });   
      }

  render() {
    // const email=UserProfile.getEmail();
    const email = localStorage.getItem("email");
    if( email != "")
    {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">History</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz-Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.quizname}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
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

export default history;
