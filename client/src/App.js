import {BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss';
import MainPage from './pages/MainPage/MainPage'
import axios from 'axios'
import {url} from './config'
import EventFormPage from './pages/EventFormPage/EventFormPage'
import {useEffect, useState} from 'react'
import PrivateRoute from './components/PrivateRoutes/PrivateRoutes'
import {EventsPage} from './pages/EventsPage/EventsPage';
import {Header} from './components/Header/Header';
import {EventDetailsPage} from './pages/EventDetailsPage/EventDetailsPage';

export const App = () => {
  const [events, setEvents ] = useState([])
  const [authenticated, setAuthenticated] = useState(null)
  const [user, setUser] = useState(null)
  const [timing, setTiming] = useState('newEvents')


  useEffect(() => {
    const getAuthenticated = () => {
      setAuthenticated(JSON.parse(sessionStorage.getItem('jwt')))
    }
    if(sessionStorage.getItem('jwt')){
      getAuthenticated()
    }
  }, [])

  useEffect(() => {
    const getUser = () => {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${authenticated}`,
      }
      axios.get(`${url}user`)
        .then(response => {
          setUser(response.data)
          if(response.data.role ==='Planner'){
            return axios.get(`${url}user/events/${timing}`)
          }
          if(response.data.role === 'Vendor'){
            return axios.get(`${url}vendor/events/${timing}`)
          }

        })
        .then(response => {
          let sortedArray = sortArray(response.data)
          setEvents(sortedArray)
        })
    }
    if(authenticated) {
      getUser()
    }
  }, [authenticated, timing])


  const handleUpdate = (type) => {
    if(type === 'events'){
      axios
        .get(`${url}events`)
        .then( response =>{
          let sortedArray = sortArray(response.data)
          setEvents(sortedArray)
        })
    }
    else if(type === 'vendor'){
      axios
        .get(`${url}user`)
        .then(response => {
          setUser(response.data)
        })
    }
    else if(type === 'vendorEvents'){
      axios
        .get(`${url}vendor/events/newEvents`)
        .then(response => {
          let sortedArray = sortArray(response.data)
          setEvents(sortedArray)
        })
    }
  }

  const sortArray = (array) => {
    return array.sort((eventA, eventB) => {
      return (new Date(eventA.eventDate) - new Date(eventB.eventDate))
    })
  }

  const handleLogin = (data) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(data.token));
      setAuthenticated(JSON.parse(sessionStorage.getItem('jwt')))
    }
  }

  const handleTiming = (value) => {
    setTiming(value);
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem('jwt')
    }
    setAuthenticated(false)
  }



  return(
    <div className="App">
      <BrowserRouter>
        {authenticated && <Header handleLogout={handleLogout} user={user} /> }
        <Switch>
          <Route path="/login" render={(routerProps) => <MainPage {...routerProps}  handleLogin={handleLogin} handleLogout={handleLogout} authenticated={authenticated} action='signin'/>} />
          <Route path="/signup" render={(routerProps) => <MainPage {...routerProps}  handleLogin={handleLogin} handleLogout={handleLogout} user={user} action='signup' />} />
          <PrivateRoute path="/events/addEvent" render={(routerProps) => <EventFormPage {...routerProps} action="add" elementType="event"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  />} />
          <PrivateRoute path="/events/:eventId/editEvent" render={(routerProps) => <EventFormPage {...routerProps} action="edit" elementType="event"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  />} />
          <PrivateRoute path="/vendors/:vendorId/editVendor" render={(routerProps) => <EventFormPage {...routerProps} action="edit" elementType="vendor"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  />} />
          <PrivateRoute path="/vendor/:vendorId/event/:eventId" render={(routerProps) => <EventFormPage {...routerProps}  elementType="vendorEvent"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  />} />
          <PrivateRoute path="/event/:eventId/message/:vendorId" render={(routerProps) => <EventFormPage {...routerProps} action="message"   handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated} user={user} />} />
          <Route path="/event/edit/:eventId" render={(routerProps) => <EventFormPage {...routerProps} action="edit" handleUpdate={handleUpdate} />}/>
          <PrivateRoute path="/events/:eventId/addVendor" render={(routerProps) => <EventFormPage {...routerProps} action="add" elementType="vendor"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  /> }/>
          <PrivateRoute path="/events/:eventId" render={(routerProps) => <EventDetailsPage {...routerProps} user={user} authenticated={authenticated}/> }/>
          { events && <PrivateRoute path="/" render={(routerProps) => <EventsPage {...routerProps} events={events} authenticated={authenticated} handleChange={handleTiming} user={user} /> }/>}
        </Switch>
      </BrowserRouter>
    </div>
  )
}
