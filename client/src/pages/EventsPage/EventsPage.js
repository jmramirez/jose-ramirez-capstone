import './EventsPage.scss'
import {PageHeader} from '../../components/PageHeader/PageHeader';
import {EventsList} from '../../components/EventsList/EventsList';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../../config';
import EventDetails from '../../components/EventDetails/EventDetails';

export const EventsPage = ({ events, match, authenticated, handleChange }) => {
  const eventId = match.params.eventId
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    const getEvent = (eventId) => {
      axios.get(`${url}events/${eventId}`,{
        headers: {
          'Authorization' : `Bearer ${authenticated}`
        }
      })
        .then(response => {
          console.log(response.data)
          setEvent(response.data)
          setLoading(false)
        })
    }
    if(eventId){
      getEvent(eventId)
    }
  }, [eventId])

  return(
    <div className="events">
      <PageHeader elementType="Events" buttonText="Create New Event" handleChange={handleChange}/>
      <div className="events-content">
        <EventsList events={events} />
      </div>
    </div>
  )
}