import axios from 'axios'
import './Dashboard.scss'
import { useState, useEffect } from 'react'
import  { url } from '../../config'
import EventDetails from '../../components/EventDetails/EventDetails'
import {useHistory} from 'react-router-dom'
import {VendorsSelect} from '../../components/VendorsSelect/VendorsSelect'


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
        })
      }
    }
  }, [eventId, role])

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
      {/*<div className="dashboard__user">
        <div className="dashboard__user__user_info">
          <div className="dashboard__top">
            <h3 className="event__heading">Hello: {user && user.name}</h3>
            <button onClick={logOut} className="add-vendor__add-button">Log Out</button>
          </div>

        </div>
      </div>*/}
      <div className="dashboard-content">
        <div className="dashboard__user">
          <div className="dashboard__user__user_info">
            <div className="dashboard__top">
              <h3 className="event__heading">Hello: {user && user.name}</h3>
              <button onClick={logOut} className="add-vendor__add-button">Log Out</button>
            </div>

          </div>
        </div>
        { !eventId?
          ''
          :
          (eventLoading? <p>Loading</p> : <EventDetails eventItem={eventSelected} user={user} />) }
      </div>
    </div>
  )
}
