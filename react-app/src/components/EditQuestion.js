import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class AddQuestion extends Component {
    constructor() {
      super();
      this.state = {
        formData: {
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
    componentDidMount(event) {
        let queryA = {...this.state.formData, "ansA":0};
        this.setState({ formData: queryA});
        let queryB = {...this.state.formData, "ansB":0};
        this.setState({ formData: queryB});
        let queryC = {...this.state.formData, "ansB":0};
        this.setState({ formData: queryC});
        let queryD = {...this.state.formData, "ansB":0};
        this.setState({ formData: queryD});
        var quesid= this.props.match.params.id;
        const request = new Request('http://127.0.0.1:8080/showques/' + this.props.match.params.id);
        fetch(request)
            .then(response => response.json())
                .then(data => this.setState({formData: data}));
    }
    handleQChange (event) {
        let query = {...this.state.formData, "question":event.target.value};
        this.setState({ formData: query});
    }
    handleoptAChange (event) {
        let query = {...this.state.formData, "optA":event.target.value};
        this.setState({ formData: query});
    }
    handleoptBChange (event) {
        let query = {...this.state.formData, "optB":event.target.value};
        this.setState({ formData: query});
    }
    handleoptCChange (event) {
        let query = {...this.state.formData, "optC":event.target.value};
        this.setState({ formData: query});
    }
    handleoptDChange (event) {
        let query = {...this.state.formData, "optD":event.target.value};
        this.setState({ formData: query});
    }
    handleAnsA (event) {
        let query = {...this.state.formData, "ansA":1};
        this.setState({ formData: query});
        // this.state.formData.ansA = 1;
    }
    handleAnsB (event) {
        let query = {...this.state.formData, "ansB":1};
        this.setState({ formData: query});
    }
    handleAnsC (event) {
        let query = {...this.state.formData, "ansC":1};
        this.setState({ formData: query});
        // this.state.formData.ansC = 1;
    }
    handleAnsD (event) {
        let query = {...this.state.formData, "ansD":1};
        this.setState({ formData: query});
        // this.state.formData.ansD = 1;1
    }
      handleSubmit (event) {
        const id = this.props.match.params.id;        
        event.preventDefault();
        fetch('http://localhost:8080/editquiz/'+ this.props.match.params.id, {
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
                        <input type="text" className="form-control" value={this.state.formData.question} onChange={this.handleQChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option A</label>
                        <input type="text" className="form-control" value={this.state.formData.optA} onChange={this.handleoptAChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option B</label>
                        <input type="text" className="form-control" value={this.state.formData.optB} onChange={this.handleoptBChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option C</label>
                        <input type="text" className="form-control" value={this.state.formData.optC} onChange={this.handleoptCChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option D</label>
                        <input type="text" className="form-control" value={this.state.formData.optD} onChange={this.handleoptDChange}/>
                    </div>
                    <div className="form-group">
                        <label>A</label>
                        <input type="radio" className="radio-name" value={this.state.formData.ansA} onChange={this.handleAnsA}/>
                    </div>
                    <div className="form-group">
                        <label>B</label>
                        <input type="radio" className="radio-name" value={this.state.formData.ansB} onChange={this.handleAnsB}/>
                    </div>
                    <div className="form-group">
                        <label>C</label>
                        <input type="radio" className="radio-name" value={this.state.formData.ansC} onChange={this.handleAnsC}/>
                    </div>
                    <div className="form-group">
                        <label>D</label>
                        <input type="radio" className="radio-name" value={this.state.formData.ansD} onChange={this.handleAnsD}/>
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