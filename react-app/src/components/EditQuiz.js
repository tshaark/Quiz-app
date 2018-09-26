import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class EditQuiz extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            i: 0,
            submitted: 'false',
        }
    }
    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/play/' + this.props.match.params.id);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
    }
    handleCheck=(event) =>{
        event.preventDefault();
        this.setState({i : this.state.i + 1});
    }
    handleDel=(event) =>{
        event.preventDefault();
        fetch('http://localhost:8080/ques/' + this.state.data[this.state.i].id, {
            method: 'DELETE',
           //  body: JSON.stringify(this.state.formData),
          })
          .then(response => {
           if(response.status >= 200 && response.status < 300)
               window.location.reload();
               this.handleCheck();
               this.setState({submitted: true});
           });
    }
    // handleEdit=(event) =>{
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">QUESTIONS</h1>
                </header>
                    {this.state.i == this.state.data.length &&
                      <div>
                        <h2>YOLO!</h2>
                        </div>
                    }
                    {this.state.data.length > 0 && this.state.i != this.state.data.length &&
                        <div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h2>Q{this.state.i + 1}:-{this.state.data[this.state.i].question}</h2>
                            <br></br>
                            <p>A)<button>{this.state.data[this.state.i].optA}</button></p>
                            <br></br>
                            <p>B)<button>{this.state.data[this.state.i].optB}</button></p>
                            <br></br>
                            <p>C)<button>{this.state.data[this.state.i].optC}</button></p>
                            <br></br>                        
                            <p>D)<button>{this.state.data[this.state.i].optD}</button></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><Link to={'/EditQuestion/'+this.state.data[this.state.i].id}>Edit question</Link></p>
                            <br></br>
                            <button onClick={this.handleDel}>DELETE QUESTION</button>
                            <br></br>
                            <button onClick={this.handleCheck}>NEXT</button>    
                        </div>                 
                    }
            </div>
      );
    }
}
export default EditQuiz;