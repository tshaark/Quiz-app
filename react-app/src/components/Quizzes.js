import React, { Component } from 'react';
import './EditPerson.css';
import PropTypes from 'prop-types';


class Quizzes extends Component {
    constructor() {
        super();
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDel = this.handleDel.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object,
    }
    handleCreate=(event)=>{
        event.preventDefault();
        this.context.router.history.push("/CreateQuiz");
    }
    handleDel=(event)=>{
        event.preventDefault();
        this.context.router.history.push("/DeleteQuiz");
    }
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">MANAGE QUIZZES</h1>
          </header>
          <br></br>
          <br></br>
          <button onClick={this.handleCreate}>CREATE A QUIZ</button>
          <br></br>
          <br></br>
          <button onClick={this.handleDel}>DELETE</button>
        </div>
      );
    }
  }
  export default Quizzes;