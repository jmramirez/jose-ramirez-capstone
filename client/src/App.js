import { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import Dashboard from './pages/Dashboard/Dasboard'
import MainPage from './pages/MainPage/MainPage'
import axios from 'axios'


class App extends Component {

  state = {
    "events": {}
  }

  componentDidMount() {
    axios.get("https://localhost:44326/api/events")
      .then(response =>{
        console.log(response.data)
      })
  }

  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ Dashboard } />
            <Route path="/login" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
