import React, { Component } from 'react';
import './DeletePerson.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';

class DeletePerson extends Component {
  constructor(){
    super();
    this.state ={
    flag: '1',
    data: [],
    submitted: 'false',
  }
  this.handleRemove = this.handleRemove.bind(this)
  this.handleChange = this.handleChange.bind(this)
}

static contextTypes = {
  router: PropTypes.object,
}

componentDidMount = (event)=> {
  const request = new Request('http://127.0.0.1:8080/people/');
  fetch(request)
    .then(response => response.json())
      .then(data =>this.setState({data: data}));
}
handleChange = (event)=> {
  this.state.flag = event.target.value;
}
handleRemove = (event)=> {
  event.preventDefault();
  fetch('http://localhost:8080/people/' + this.state.flag, {
   method: 'DELETE',
  //  body: JSON.stringify(this.state.formData),
 })
 .then(response => {
  if(response.status >= 200 && response.status < 300)
      window.location.reload();
      this.context.router.history.push("/DeletePerson");
      this.setState({submitted: true});
  });
 }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>
      <form onSubmit={this.handleRemove}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lasttname</th>
              <th>Email</th>
              <th>Select</th>
            </tr>
          </thead>
            <tbody>{this.state.data.map((item, key) => {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.email}</td>
                      <td><input type="radio" name="bob" value={item.id} onChange={this.handleChange}/></td>
                  </tr>
                )
             })} 
          </tbody>
          

        </table>
          
          <br></br>
          <button>Submit</button>
      </form>
      </div>
    );
  }
}

export default DeletePerson;