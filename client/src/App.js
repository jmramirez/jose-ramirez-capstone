import { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import Dashboard from './pages/Dashboard/Dasboard'
import MainPage from './pages/MainPage/MainPage'
import axios from 'axios'
import AddEventForm from './components/AddEventForm/EventsForm'
import  { url } from './config'
import Sidebar from './components/Sidebar/Sidebar'
import EventForm from './pages/EventForm/EventForm'
import VendorForm from './pages/VendorForm/VendorForm'


class App extends Component {

  state = {
    events : []
  }

  componentDidMount() {
    axios
      .get(`${url}events`)
      .then( response =>{
        this.setState({
          events: response.data
        })
      })
  }

  handleUpdate = () => {
    axios
      .get(`${url}events`)
      .then( response =>{
        this.setState({
          events: response.data
        })
      })
  }


  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <Sidebar events={this.state.events} />
          <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/event/add" render={(routerProps) => <EventForm {...routerProps} action="add"  handleUpdate={this.handleUpdate} />}/>
            <Route path="/event/edit/:eventId" render={(routerProps) => <EventForm {...routerProps} action="edit" handleUpdate={this.handleUpdate} />}/>
            <Route path="/vendor/add/:eventId" render={(routerProps) => <VendorForm {...routerProps} />}/>
            <Route path="/getevent/:id" render={(routerProps) => <Dashboard {...routerProps} />}/>
            <Route path="/login" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
