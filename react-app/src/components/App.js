import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import EditPerson from './EditPerson';
import NewPerson from './NewPerson';
import LoginPerson from './LoginPerson';
import AdminPanel from './AdminPanel';
import Quizzes from './Quizzes';
import CreateQuiz from './CreateQuiz'
import ViewQuizzes from './ViewQuizzes'
import AddQuestion from './AddQuestion'
import Play from './Play'
import LeaderBoard from './LeaderBoard'
import history from './history'
import EditQuiz from './EditQuiz'
import EditQuestion from './EditQuestion'
import LeaderGenre from './LeaderGenre'
import LeaderOverall from './LeaderOverall'
import LeaderByGenre from './LeaderByGenre'




import Home from './Home';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PlayQuiz from './PlayQuiz';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewPerson'}>Sign up</Link></li>
                  <li><Link to={'/LoginPerson'}>Login/Logout</Link></li>
                  <li><Link to={'/AdminPanel'}>AdminPanel</Link></li>
                  <li><Link to={'/Play'}>Play</Link></li>
                  <li><Link to={'/LeaderBoard'}>LeaderBoard</Link></li>
                  <li><Link to={'/History'}>History</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/EditPerson' component={EditPerson} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/LoginPerson' component={LoginPerson} />
                 <Route exact path='/AdminPanel' component={AdminPanel} /> 
                 <Route exact path='/Quizzes' component={Quizzes} />     
                 <Route exact path='/CreateQuiz' component={CreateQuiz} />    
                 <Route exact path='/ViewQuizzes' component={ViewQuizzes} />  
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />  
                 <Route exact path='/history' component={history} />      
                 <Route exact path='/Play' component={Play} />
                 <Route exact path='/LeaderGenre' component={LeaderGenre} />    
                 <Route exact path='/LeaderOverall' component={LeaderOverall} />    
                 <Route exact path='/LeaderByGenre/:genre' component={LeaderByGenre} render ={({match}) => <LeaderByGenre genre={match.params.genre}/>}  />      
                 <Route exact path='/EditQuiz/:id' component={EditQuiz} render ={({match}) => <EditQuiz id={match.params.id}/>}  />      
                 <Route exact path='/AddQuestion/:id' component={AddQuestion} render ={({match}) => <AddQuestion id={match.params.id}/>} />          
                 <Route exact path='/PlayQuiz/:id' component={PlayQuiz} render ={({match}) => <PlayQuiz id={match.params.id}/>} />  
                 <Route exact path='/EditQuestion/:id' component={EditQuestion} render ={({match}) => <EditQuestion id={match.params.id}/>} />          
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
