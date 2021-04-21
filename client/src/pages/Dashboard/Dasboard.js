import axios from 'axios'
import './Dashboard.scss'
import { useState, useEffect } from 'react'
import  { url } from '../../config'
import VendorList from '../../components/VendorsList/VendorsList'
import EventDetails from '../../components/EventDetails/EventDetails'


export const Dashboard = ({match}) => {
  const [eventSelected, setEventSelected] = useState(null)
  const [eventLoading, setEventLoading] = useState(true)
  const [vendors, setVendors] = useState([])
  const [vendorsLoading, setVendorsLoading] = useState(true)
  const eventId = match.params.id

  useEffect(() => {
    if(eventId){
      axios.get(`${url}events/${eventId}`).then(response =>{
        setEventSelected(response.data)
        setEventLoading(false)
      })
    }
  }, [eventId])

  useEffect(()=> {
    if(eventId){
      axios.get(`${url}events/${eventId}/vendors`).then(response =>{
        console.log(response.data)
        setVendors(response.data)
        setVendorsLoading(false)
      })
    }
  }, [eventId])

  return(
    <div className="dashboard">
      <div className="dashboard-content">
        { !eventId? <p>No event id</p>
          :

          (eventLoading? <p>Loading</p> :
            <>
            <EventDetails eventItem={eventSelected} />
              {vendorsLoading? <p>Loading</p> : <VendorList vendors={vendors} eventId={eventSelected.id} />}
            </>
            )


        }
      </div>
    </div>
  )
}
