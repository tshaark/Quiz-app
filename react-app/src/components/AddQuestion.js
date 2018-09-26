import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class AddQuestion extends Component {
    constructor() {
      super();
      this.state = {
        formData: {
          type: "",
          quizid: "",
          question: "",
          optA: "",
          optB: "",
          optC: "",
          optD: "",
          ansA: 0,
          ansB: 0,
          ansC: 0,
          ansD: 0,
        }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleQChange = this.handleQChange.bind(this)
    this.handleoptAChange = this.handleoptAChange.bind(this)
    this.handleoptBChange = this.handleoptBChange.bind(this)
    this.handleoptCChange = this.handleoptCChange.bind(this)
    this.handleoptDChange = this.handleoptDChange.bind(this)
    this.handleAnsA = this.handleAnsA.bind(this)
    this.handleAnsB = this.handleAnsB.bind(this)
    this.handleAnsC = this.handleAnsC.bind(this)
    this.handleAnsD = this.handleAnsD.bind(this)

}
    static contextTypes = {
        router: PropTypes.object,
    }
    // componentDidMount = (event) => {
    //     this.state.formData.quizid = this.props.match.params.id;
    // }
    handleQChange (event) {
        this.state.formData.question = event.target.value;
    }
    handleoptAChange (event) {
        this.state.formData.optA = event.target.value;
    }
    handleoptBChange (event) {
        this.state.formData.optB = event.target.value;
    }
    handleoptCChange (event) {
        this.state.formData.optC = event.target.value;
    }
    handleoptDChange (event) {
        this.state.formData.optD = event.target.value;
    }
    handleAnsA (event) {
        this.state.formData.ansA = 1;
    }
    handleAnsB (event) {
        this.state.formData.ansB = 1;
    }
    handleAnsC (event) {
        this.state.formData.ansC = 1;
    }
    handleAnsD (event) {
        this.state.formData.ansD = 1;
    }
    handleTypeText=(event)=>{
        this.state.formData.type = "0";
    }
    handleTypeImage=(event)=>{
        this.state.formData.type = "1";
    }
    handleTypeVideo=(event)=>{
        this.state.formData.type = "2";
    }
      handleSubmit (event) {
        this.state.formData.quizid = this.props.match.params.id;        
        // console.log(this.state.formData.quizid);
        event.preventDefault();
        fetch('http://localhost:8080/viewquiz/'+ this.props.match.params.id, {
         method: 'POST',
         
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
              this.context.router.history.push("/ViewQuizzes");
          });
      }
    render(){
        return(
            <div className="App">
            <header className="App-header">
                <h1 className="App-title">ADD A QUESTION</h1>
            </header>
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Question</label>
                        <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
                    </div>
                    <div className="form-group">
                        <label>Text</label>
                        <input type="radio" className="radio-name" value={this.state.type} onChange={this.handleTypeText}/>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="radio" className="radio-name" value={this.state.type} onChange={this.handleTypeImage}/>
                    </div>
                    <div className="form-group">
                        <label>Video</label>
                        <input type="radio" className="radio-name" value={this.state.type} onChange={this.handleTypeVideo}/>
                    </div>
                    <div className="form-group">
                        <label>Option A</label>
                        <input type="text" className="form-control" value={this.state.optA} onChange={this.handleoptAChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option B</label>
                        <input type="text" className="form-control" value={this.state.optB} onChange={this.handleoptBChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option C</label>
                        <input type="text" className="form-control" value={this.state.optC} onChange={this.handleoptCChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option D</label>
                        <input type="text" className="form-control" value={this.state.optD} onChange={this.handleoptDChange}/>
                    </div>
                    <div className="form-group">
                        <label>A</label>
                        <input type="radio" className="radio-name" value={this.state.ansA} onChange={this.handleAnsA}/>
                    </div>
                    <div className="form-group">
                        <label>B</label>
                        <input type="radio" className="radio-name" value={this.state.ansB} onChange={this.handleAnsB}/>
                    </div>
                    <div className="form-group">
                        <label>C</label>
                        <input type="radio" className="radio-name" value={this.state.ansC} onChange={this.handleAnsC}/>
                    </div>
                    <div className="form-group">
                        <label>D</label>
                        <input type="radio" className="radio-name" value={this.state.ansD} onChange={this.handleAnsD}/>
                    </div>

                    <button>Submit</button>
                    <br></br>
                    <br></br>
                    <div>
                        <Link to={'/ViewQuizzes'}>ViewQuizzes</Link>
                    </div>
                </form>
        </div>
    </div>
        );
    }
}
export default AddQuestion;