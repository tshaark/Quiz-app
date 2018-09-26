import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
import ReactPlayer from 'react-player'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class PlayQuiz extends Component{
    constructor() {
        super();
        this.state = {
            i : 0,
            optA: 0,
            optB: 0,
            optC: 0,
            optD: 0,
            data: [],
            dataN: "",
            dataU: "",
            dataW: "",
            score: 0,
            submitted: 'false',
            histo:{
                playerid: 0,
                quizname: "",
                score: 0,
            }   
        }
    }
      static contextTypes = {
        router: PropTypes.object,
      }
      handleCheck=(event) =>{
          event.preventDefault();
          let st=this.state.data[this.state.i];
          if(st.ansA == this.state.optA && st.ansB == this.state.optB && st.ansC == this.state.optC && st.ansD == this.state.optD)
          {
                this.setState({score : this.state.score + 1});
          }
          this.setState({i : this.state.i + 1});
          this.state.optA = 0;
          this.state.optB = 0;
          this.state.optC = 0;
          this.state.optD = 0;

      }
      handleA=(event) =>{
          event.preventDefault();
          if(this.state.optA == 0)
          {
            this.state.optA = 1;
          }
          else
          {
              this.state.optA = 0;
          }
      }
      handleB=(event) =>{
        event.preventDefault();
        if(this.state.optB == 0)
        {
          this.state.optB = 1;
        }
        else
        {
            this.state.optB = 0;
        }
          
      }
      handleC=(event) =>{
        event.preventDefault();
        if(this.state.optC == 0)
        {
          this.state.optC = 1;
        }
        else
        {
            this.state.optC = 0;
        }
          
      }
      handleD=(event) =>{
        event.preventDefault();
        if(this.state.optD == 0)
        {
          this.state.optD = 1;
        }
        else
        {
            this.state.optD = 0;
        }
          
      }
      redirect=(event)=>{
        this.context.router.history.push("/Play");
      }
      handleHist=(event)=>{
        event.preventDefault();
        this.state.histo.score=this.state.score;
        // console.log(this.state.histo.score);
        this.state.histo.quizname=this.state.dataN.name;
        // console.log(this.state.dataN.name);
        this.state.histo.playerid=this.state.dataU.id;
        this.state.histo.genre=this.state.dataW.genre;

        
        console.log(this.state.histo.genre);
        fetch('http://localhost:8080/hist', {
            method: 'POST',
            body: JSON.stringify(this.state.histo),
        })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
            //   this.context.router.history.push("/ViewQuizzes");
          });
      }
      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/play/' + this.props.match.params.id);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));


        const requestN = new Request('http://127.0.0.1:8080/getname/' + this.props.match.params.id);
        fetch(requestN)
          .then(response => response.json())
            .then(data => this.setState({dataN: data}));

        // const email = UserProfile.getEmail();
        const email = localStorage.getItem("email");
        const requestU = new Request('http://127.0.0.1:8080/getusername/' + email);
        fetch(requestU)
          .then(response => response.json())
            .then(data => this.setState({dataU: data}));

        const requestW = new Request('http://127.0.0.1:8080/getgenre/' + this.props.match.params.id);
        fetch(requestW)
          .then(response => response.json())
            .then(data => this.setState({dataW: data}));
        
      }
render(){
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">QUIZ</h1>
            </header>
                {this.state.i == this.state.data.length &&
                  <div>
                    <h1>SCORE - {this.state.score}/{this.state.data.length}</h1>
                    <button onClick={this.handleHist}>SAVE SCORE?</button>
                    <button onClick={this.redirect}>PLAY AGAIN!</button>
                    </div>
                }
                {this.state.data.length > 0 && this.state.i != this.state.data.length &&
                    <div>
                        <br></br>
                        <br></br>
                        <br></br>
                        {this.state.data[this.state.i].type == "0" &&
                        <h2>Q{this.state.i + 1}:-{this.state.data[this.state.i].question}</h2>
                        }
                        {this.state.data[this.state.i].type == "1" &&
                          <div>
                            <h2>Q{this.state.i + 1}:-Identify?</h2>
                            <img src={this.state.data[this.state.i].question} alt="bt"></img>
                          </div>
                        }
                        {this.state.data[this.state.i].type == "2" &&
                          <div>
                            <h2>Q{this.state.i + 1}:-Identify?</h2>
                            <ReactPlayer url={this.state.data[this.state.i].question} playing className="Vid"/>
                          </div>
                        }
                        <br></br>
                        <p>A)<button onClick={this.handleA}>{this.state.data[this.state.i].optA}</button></p>
                        <br></br>
                        <p>B)<button onClick={this.handleB}>{this.state.data[this.state.i].optB}</button></p>
                        <br></br>
                        <p>C)<button onClick={this.handleC}>{this.state.data[this.state.i].optC}</button></p>
                        <br></br>                        
                        <p>D)<button onClick={this.handleD}>{this.state.data[this.state.i].optD}</button></p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <button onClick={this.handleCheck}>NEXT</button>    
                    </div>                 
                }
        </div>
  );
}
}
export default PlayQuiz;