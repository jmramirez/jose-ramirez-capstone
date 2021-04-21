import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss';
import {Dashboard} from './pages/Dashboard/Dasboard'
import MainPage from './pages/MainPage/MainPage'
import axios from 'axios'
import {url} from './config'
import Sidebar from './components/Sidebar/Sidebar'
import EventForm from './pages/EventForm/EventForm'
import VendorForm from './pages/VendorForm/VendorForm'
import {useEffect, useState} from 'react'

export const App = () => {
  const [events, setEvents ] = useState([])

  useEffect(() => {
    axios
      .get(`${url}events`)
      .then( response =>{
        console.log(response.data)
        let sortedArray = sortArray(response.data)
        setEvents(sortedArray)
      })
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

  return(
    <div className="App">
      <BrowserRouter>
        <Sidebar events={events} />
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/event/add" render={(routerProps) => <EventForm {...routerProps} action="add"  handleUpdate={handleUpdate} />}/>
          <Route path="/event/edit/:eventId" render={(routerProps) => <EventForm {...routerProps} action="edit" handleUpdate={handleUpdate} />}/>
          <Route path="/vendor/add/:eventId" render={(routerProps) => <VendorForm {...routerProps} action="Add"  />}/>
          <Route path="/vendor/edit/:vendorId/:eventId" render={(routerProps) => <VendorForm {...routerProps}  action="Edit"  handleUpdate={handleUpdate} />}/>
          <Route path="/getevent/:id" render={(routerProps) => <Dashboard {...routerProps} />}/>
          <Route path="/login" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
