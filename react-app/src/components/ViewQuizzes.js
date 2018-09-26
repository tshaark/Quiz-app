import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewQuizzes extends Component {
  constructor() {
    super();
    this.state = {
        // flag: '1',
        data: [],
        submitted: 'false',
    }
    this.handleDel = this.handleDel.bind(this)
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/viewquiz');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleDel = (event)=> {
    event.preventDefault();
    this.state.flag=event.target.value;
    fetch('http://localhost:8080/viewquiz/' + this.state.flag, {
     method: 'DELETE',
    //  body: JSON.stringify(this.state.formData),
   })
   .then(response => {
    if(response.status >= 200 && response.status < 300)
        window.location.reload();
        this.context.router.history.push("/ViewQuizzes");
        this.setState({submitted: true});
    });
   }

render(){
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">QUIZZES</h1>
            </header>
            <form>
            <table className="table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Type</th>
                    <th>Add</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {
                 return (
                    <tr key = {key}>
                         <td>{item.id}</td>
                         <td>{item.name}</td>
                         <td>{item.genre}</td>
                         <td>{item.type}</td>
                         <td><Link to={'/AddQuestion/'+item.id}>Add questions</Link></td>
                         <td><Link to={'/EditQuiz/'+item.id}>Edit</Link></td>
                         <td><button onClick={this.handleDel} value={item.id}>Delete Quiz</button></td>
                    </tr>
                 )
                })} 
            </tbody>
            </table>
    </form>
    </div>
  );
}
}
export default ViewQuizzes;
