import { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import Dashboard from './pages/Dashboard/Dasboard'
import MainPage from './pages/MainPage/MainPage'
import axios from 'axios'
import AddEventForm from './components/AddEventForm/EventForm'


class App extends Component {



  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ Dashboard } />
            <Route path="/event/:action" render={(routerProps) => <Dashboard {...routerProps} />}/>
            <Route path="/login" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
