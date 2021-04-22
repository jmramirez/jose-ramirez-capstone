import axios from 'axios'
import './Dashboard.scss'
import { useState, useEffect } from 'react'
import  { url } from '../../config'
import EventDetails from '../../components/EventDetails/EventDetails'
import {useHistory} from 'react-router-dom'


export const Dashboard = ({match, handleLogout, user}) => {
  const [eventSelected, setEventSelected] = useState(null)
  const [eventLoading, setEventLoading] = useState(true)
  const [role, setRole] = useState('');
  const eventId = match.params.id
  const history = useHistory()

  useEffect(() => {
    if(user){
      setRole(user.role)
    }
  },[user])

  useEffect(() => {
    if(eventId){
      if(role ==='Planer'){
        axios.get(`${url}events/${eventId}`).then(response =>{
          setEventSelected(response.data)
          setEventLoading(false)
          console.log(response.data)
        })
      }
      if(role ==='Vendor'){
        axios.get(`${url}events/${eventId}/eventvendor`).then(response =>{
          setEventSelected(response.data)
          setEventLoading(false)
          console.log(response)
        })
      }
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
        { !eventId? <p>No event id</p> : (eventLoading? <p>Loading</p> : <EventDetails eventItem={eventSelected} user={user} />) }
      </div>
    </div>
  )
}
