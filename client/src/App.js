import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.scss';
import {Dashboard} from './pages/Dashboard/Dasboard'
import MainPage from './pages/MainPage/MainPage'
import axios from 'axios'
import {url} from './config'
import Sidebar from './components/Sidebar/Sidebar'
import EventForm from './pages/EventForm/EventForm'
import VendorForm from './pages/VendorForm/VendorForm'
import {useEffect, useState} from 'react'
import PrivateRoute from './components/PrivateRoutes/PrivateRoutes'

export const App = () => {
  const [events, setEvents ] = useState([])
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios
      .get(`${url}events`)
      .then( response =>{
        let sortedArray = sortArray(response.data)
        setEvents(sortedArray)
      })
  }, [])

  useEffect(() => {
    if(isAuthenticated()) {
      setAuthenticated(true)
    }
  }, [])

  const handleUpdate = () => {
    axios
      .get(`${url}events`)
      .then( response =>{
        let sortedArray = sortArray(response.data)
        setEvents(sortedArray)
      })
  }

  const sortArray = (array) => {
    return array.sort((eventA, eventB) => {
      return (new Date(eventA.eventDate) - new Date(eventB.eventDate))
    })
  }

  const handleLogin = (data) => {
    console.log(data)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(data.token));
    }
    setAuthenticated(true)
  }

  const isAuthenticated = () => {
    if (typeof window == 'undefined') {
      return false;
    }

    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('jwt'));
    } else {
      return false;
    }
  }



  return(
    <div className="App">
      <BrowserRouter>
        {authenticated && <Sidebar events={events} />}
        <Switch>
          <Route path="/login" render={(routerProps) => <MainPage {...routerProps}  handleLogin={handleLogin} />} />
          <PrivateRoute path="/event/add" render={(routerProps) => <EventForm {...routerProps} action="add"  handleUpdate={handleUpdate} />} />
          {/*<Route path="/event/add" render={(routerProps) => <EventForm {...routerProps} action="add"  handleUpdate={handleUpdate} />}/>*/}
          <PrivateRoute path="/event/edit/:eventId" render={(routerProps) => <EventForm {...routerProps} action="edit" handleUpdate={handleUpdate} />} />
          {/*<Route path="/event/edit/:eventId" render={(routerProps) => <EventForm {...routerProps} action="edit" handleUpdate={handleUpdate} />}/>*/}
          <PrivateRoute path="/vendor/add/:eventId" render={(routerProps) => <VendorForm {...routerProps} action="Add"  />}/>
          <Route path="/vendor/add/:eventId" render={(routerProps) => <VendorForm {...routerProps} action="Add"  />}/>
          <PrivateRoute path="/vendor/edit/:vendorId/:eventId" render={(routerProps) => <VendorForm {...routerProps}  action="Edit"  handleUpdate={handleUpdate} />} />
          {/*<Route path="/vendor/edit/:vendorId/:eventId" render={(routerProps) => <VendorForm {...routerProps}  action="Edit"  handleUpdate={handleUpdate} />}/>*/}
          <PrivateRoute path="/getevent/:id" render={(routerProps) => <Dashboard {...routerProps} />}/>
          {/*<Route path="/getevent/:id" render={(routerProps) => <Dashboard {...routerProps} />}/>*/}
          <PrivateRoute path="/" component={Dashboard}/>

        </Switch>
      </BrowserRouter>
    </div>
  )
}
