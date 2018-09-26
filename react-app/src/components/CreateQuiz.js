import React, { Component } from 'react';
import './EditPerson.css';
import PropTypes from 'prop-types';

class CreateQuiz extends Component{
    constructor() {
        super();
        this.state = {
            formData: {
              name: "",
              type: "",
              genre: ""
            },
            submitted: false,
        }
        this.handleName= this.handleName.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleType= this.handleType.bind(this);
        this.handleGenre= this.handleGenre.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object,
    }
    handleSubmit (event) {
    
        event.preventDefault();
        fetch('http://localhost:8080/quiz', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
              this.context.router.history.push("/ViewQuizzes");
          });
      }
      handleName(event) {
        this.state.formData.name = event.target.value;
      }
      handleGenre(event) {
        this.state.formData.genre = event.target.value;
      }
      handleType(event) {
        this.state.formData.type = event.target.value;
        console.log(this.state.formData.type);
      }
    render(){
        return (
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">CREATE A QUIZ</h1>
              </header>
              <br/><br/>
              <div className="formContainer">
              <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input name="quizname" type="text" className="form-control" value={this.state.quizname} required="required" onChange={this.handleName}/>
                    <label>QUIZ-NAME</label>
                  </div>
                  <h2>TYPE:-</h2>
                  <label>
                      SINGLE-CORRECT
                  </label>
                  <input type="radio" className="radio-name" value="singleCorrect"  onChange={this.handleType}/>
                  <br></br>
                  <label>
                      MULTI-CORRECT
                  </label>
                      <input type="radio" className="radio-name" value="multipleCorrect"  onChange={this.handleType}/>
                  <br></br>
                  <br></br>
                  <h2>GENRE:-</h2>
                  <label>
                      DC-COMICS
                  </label>
                  <input type="radio" className="radio-name" value="DC-comics" onChange={this.handleGenre}/>
                  <br></br>
                  <label>
                      MARVEL-COMICS
                  </label>
                  <input type="radio" className="radio-name" value="Marvel-comics"  onChange={this.handleGenre}/>
                  <br></br>
                  <label>
                      GOT
                  </label>
                  <input type="radio" className="radio-name" value="GOT" onChange={this.handleGenre}/>
                  <br></br>
                  <button>Submit</button>


          </form>
              </div>
            </div>
          );
    }

}
export default CreateQuiz