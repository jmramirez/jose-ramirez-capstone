import {BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import './App.scss';
import {Dashboard} from './pages/Dashboard/Dasboard'
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
  const history = useHistory()
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



  /*useEffect(() => {
    if(isAuthenticated()) {
      setAuthenticated(true)
      axios.defaults.headers.common = {
        Authorization: `Bearer ${isAuthenticated()}`,
      }
      axios.get(`${url}user`)
        .then(response => {
          console.log(response.data)
          setUser(response.data)
          if(response.data.role === 'Planer') {
            axios
              .get(`${url}events`)
              .then( response =>{
                let sortedArray = sortArray(response.data)
                setEvents(sortedArray)
              })
          }
          if(response.data.role === 'VendorItem') {
            axios
              .get(`${url}events/${response.data.vendorId}/vendor`)
              .then( response =>{
                let sortedArray = sortArray(response.data)
                setEvents(sortedArray)
              })
          }
        })
    }
  }, [])*/

 /* useEffect(() => {
    if(user){
      console.log(user)
      if(user.role === 'Planer') {
        console.log('here')
        axios
          .get(`${url}events`)
          .then( response =>{
            let sortedArray = sortArray(response.data)
            setEvents(sortedArray)
          })
      }
      if(user.role === 'VendorItem') {
        axios
          .get(`${url}events/${user.vendorId}/vendor`)
          .then( response =>{
            let sortedArray = sortArray(response.data)
            setEvents(sortedArray)
          })
      }
    }
  }, [user])*/

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
  }

  const sortArray = (array) => {
    return array.sort((eventA, eventB) => {
      return (new Date(eventA.eventDate) - new Date(eventB.eventDate))
    })
  }

  const handleLogin = (data) => {
    if (typeof window !== 'undefined') {
      console.log(data.token)
      sessionStorage.setItem('jwt', JSON.stringify(data.token));
      setAuthenticated(JSON.parse(sessionStorage.getItem('jwt')))
    }
  }

  /*const isAuthenticated = () => {
    if (typeof window == 'undefined') {
      return false;
    }

    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('jwt'));
    } else {
      return false;
    }
  }*/

  const handleTiming = (value) => {
    setTiming(value);
    console.log(timing)
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
          <Route path="/login" render={(routerProps) => <MainPage {...routerProps}  handleLogin={handleLogin} handleLogout={handleLogout} user={user} action='signin'/>} />
          <Route path="/signup" render={(routerProps) => <MainPage {...routerProps}  handleLogin={handleLogin} handleLogout={handleLogout} user={user} action='signup' />} />
          <PrivateRoute path="/events/addEvent" render={(routerProps) => <EventFormPage {...routerProps} action="add" elementType="event"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  />} />
          <PrivateRoute path="/events/:eventId/editEvent" render={(routerProps) => <EventFormPage {...routerProps} action="edit" elementType="event"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  />} />
          <PrivateRoute path="/vendors/:vendorId/editVendor" render={(routerProps) => <EventFormPage {...routerProps} action="edit" elementType="vendor"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  />} />
          {/*<Route path="/events/add" render={(routerProps) => <EventFormPage {...routerProps} action="add"  handleUpdate={handleUpdate} />}/>*/}
          {/*<PrivateRoute path="/event/edit/:eventId" render={(routerProps) => <EventFormPage {...routerProps} action="edit" handleUpdate={handleUpdate} handleLogout={handleLogout} user={user} />} />*/}
          <Route path="/event/edit/:eventId" render={(routerProps) => <EventFormPage {...routerProps} action="edit" handleUpdate={handleUpdate} />}/>
          {/*<PrivateRoute path="/vendor/add/:eventId" render={(routerProps) => <VendorFormPage {...routerProps} action="Add" user={user}  />}/>*/}
          {/*<Route path="/vendor/add/:eventId" render={(routerProps) => <VendorFormPage {...routerProps} action="Add"  />}/>*/}
          {/*<PrivateRoute path="/vendor/edit/:vendorId/:eventId" render={(routerProps) => <VendorFormPage {...routerProps} action="Edit" handleUpdate={handleUpdate} handleLogout={handleLogout} user={user} />}  />*/}
          {/*<Route path="/vendor/edit/:vendorId/:eventId" render={(routerProps) => <VendorFormPage {...routerProps}  action="Edit"  handleUpdate={handleUpdate} />}/>*/}
          <PrivateRoute path="/getevent/:id" render={(routerProps) => <Dashboard {...routerProps} handleLogout={handleLogout} user={user} />}/>
         {/*<PrivateRoute path="/" render={(routerProps) => <Dashboard {...routerProps} handleLogout={handleLogout} user={user}/>}/>*/}
          <PrivateRoute path="/events/:eventId/addVendor" render={(routerProps) => <EventFormPage {...routerProps} action="add" elementType="vendor"  handleUpdate={handleUpdate} handleLogout={handleLogout} authenticated={authenticated}  /> }/>
          <PrivateRoute path="/events/:eventId" render={(routerProps) => <EventDetailsPage {...routerProps} user={user} authenticated={authenticated}/> }/>
          { events && <PrivateRoute path="/" render={(routerProps) => <EventsPage {...routerProps} events={events} authenticated={authenticated} handleChange={handleTiming} user={user} /> }/>}
        </Switch>
      </BrowserRouter>
    </div>
  )
}
