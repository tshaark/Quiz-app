import React, { Component } from 'react';
import './LoginPerson.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';

 
class AdminPanel extends Component{
    constructor() {
        super();
    this.handleQuiz = this.handleQuiz.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
    this.handleViewQuizzes = this.handleViewQuizzes.bind(this);
    }

static contextTypes = {
    router: PropTypes.object,
}

handleQuiz=(event)=>{
    event.preventDefault();
    this.context.router.history.push("/Quizzes");
}
handleUsers=(event)=>{
    event.preventDefault();
    this.context.router.history.push("/ViewPeople");
}
handleViewQuizzes=(event)=>{
    event.preventDefault();
    this.context.router.history.push("/ViewQuizzes");
}
handleDel=(event)=>{
    event.preventDefault();
    this.context.router.history.push("/DeletePerson");
}
render(){
    // const email = UserProfile.getEmail();
    const email = localStorage.getItem("email");
    if(email !== "admin@admin.com")
    {
        return(
            <div className="err">
                <h2>YOU ARE DENIED ACCESS</h2>
            </div>
        )
    }
    else
    {
        return(
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">HELLO ADMIN!</h1>
                </header>
                <br></br>
                <br></br>
                <button onClick={this.handleQuiz}>Quizzes</button> 
                <br></br>
                <br></br>
                <button onClick={this.handleUsers}>Users</button>
                <br></br>
                <br></br>
                <button onClick={this.handleViewQuizzes}>ViewQuizzes</button>
                <br></br>
                <br></br>
                <button onClick={this.handleDel}>Delete Player</button>
            </div>

        )
    }

}
}
export default AdminPanel;