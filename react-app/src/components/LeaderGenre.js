import React, { Component } from 'react';
import './EditPerson.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';



class LeaderGenre extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
              genre: "",
            },
            submitted: false,
        }
    }
    static contextTypes = {
        router: PropTypes.object,
      
    }
    handleGenre=(event)=>{
        this.state.formData.genre= event.target.value;
        this.context.router.history.push('/LeaderByGenre/'+ this.state.formData.genre);
    }  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LEADERBOARDS</h1>
        </header>
        <br></br>
        <button value="DC-comics" onClick={this.handleGenre}>DC-COMICS</button>
        <br></br>
        <button value="Marvel-comics" onClick={this.handleGenre}>MARVEL-COMICS</button>     
        <br></br>
        <button value="GOT" onClick={this.handleGenre}>GOT</button>     
      </div>

    );
  }
}

export default LeaderGenre;