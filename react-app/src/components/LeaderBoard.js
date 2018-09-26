import React, { Component } from 'react';
import './EditPerson.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class LeaderBoard extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LEADERBOARDS</h1>
        </header>
        <Link to={'/LeaderGenre'}>VIEW BY GENRE</Link>
        <br></br>
        <br></br>
        <Link to={'/LeaderOverall'}>VIEW OVERALL</Link>        
      </div>

    );
  }
}

export default LeaderBoard;
