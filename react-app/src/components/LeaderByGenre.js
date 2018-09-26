import React, { Component } from 'react';
import './EditPerson.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';



class LeaderGenre extends Component {
    constructor() {
        super();
        this.state = {
              data:[]
        }
    }
    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/leader/'+this.props.match.params.genre);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
    static contextTypes = {
        router: PropTypes.object,
      } 
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">LEADERBOARDS-GENRE</h1>
          </header>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Player ID</th>
                <th>Genre</th>
                <th>Quiz-Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                 return (
                    <tr key = {key}>
                        <td>{item.playerid}</td>
                        <td>{item.genre}</td>
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
}

export default LeaderGenre;