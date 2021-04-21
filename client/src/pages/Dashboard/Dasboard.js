import axios from 'axios'
import './Dashboard.scss'
import { useState, useEffect } from 'react'
import  { url } from '../../config'
import EventDetails from '../../components/EventDetails/EventDetails'
import {useHistory} from 'react-router-dom'


export const Dashboard = ({match, handleLogout}) => {
  const [eventSelected, setEventSelected] = useState(null)
  const [eventLoading, setEventLoading] = useState(true)
  const eventId = match.params.id
  const history = useHistory()

  useEffect(() => {
    if(eventId){
      axios.get(`${url}events/${eventId}`).then(response =>{
        setEventSelected(response.data)
        setEventLoading(false)
      })
    }
  }, [eventId])

  /*useEffect(()=> {
    if(eventId){
      axios.get(`${url}events/${eventId}/vendors`).then(response =>{
        console.log(response.data)
        setVendors(response.data)
        setVendorsLoading(false)
      })
    }
  }, [eventId])*/

  const logOut = () => {
    handleLogout()
    history.push('/')
  }

  return(
    <div className="dashboard">
      <button onClick={logOut}/>
      <div className="dashboard-content">
        { !eventId? <p>No event id</p> : (eventLoading? <p>Loading</p> : <EventDetails eventItem={eventSelected} />) }
      </div>
    </div>
  )
}
