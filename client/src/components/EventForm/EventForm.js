import './EventForm.scss'
import {useEffect, useState} from 'react'
import ReactDatepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import * as yup from 'yup'
import  { url } from '../../config'
import {Link, useHistory} from 'react-router-dom'
import { Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Icon} from '../Icon/Icon';

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  eventDate: yup.date().nullable().transform((curr,orig) => orig === ''? null : curr).required('Event Date is required'),
  budget: yup.number().typeError('Budget is required, should be a number').min(0, "Budget should be greater than 0"),
  guests: yup.number().typeError('Guests should be a valid number').min(0, "Number of guests should be greater thant 0")
})

export const EventForm = ({ action, match, handleUpdate ,authenticated }) => {
  const [event, setEvent] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const history = useHistory()
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() =>{
    const getEvent = (eventId) => {
      axios.get(`${url}events/${eventId}`,{
        headers: {
          'Authorization' : `Bearer ${authenticated}`
        }
      })
        .then(response => {
          setEvent(response.data)
          const fields = ['title','guests','description']
          fields.forEach(field => setValue(field, response.data[field]))
          setValue('budget',response.data.budget.amount)
          setValue('eventDate', new Date(response.data.eventDate))
          setLoading(false)
        })
    }
    if(match.params.eventId){
      getEvent(match.params.eventId);
    }
  },[match.params.eventId])

  const onSubmit = (data) => {
    console.log(data)
    const event = {
      title: data.title,
      description: data.description,
      budget: {
        "amount": data.budget,
        "currency": "CAD"
      },
      eventDate: data.eventDate,
      guests: data.guests
    }
    if(action === "Add New") {
      axios.post(`${url}events`,event,{
        headers: {
          'Authorization' : `Bearer ${authenticated}`
        }
      })
        .then(response =>{
          handleUpdate("events")
          history.push('/')
        })
    }

    if(action === "Edit") {
      event.id = match.params.eventId
      axios.put(`${url}events/${match.params.eventId}`, event, {
        headers: {
          'Authorization' : `Bearer ${authenticated}`
        }
      })
        .then(response => {
          handleUpdate("events")
          history.goBack()
        })
    }
  }

  return(
    <main className="eventsForm">
      <h2 className="eventsForm__header">{action} Event</h2>
      <form className="eventsForm__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="eventsForm__form-row">
          <div className="eventsForm__form-controls">
            <label className="eventsForm__form__label">Event Title</label>
            <input className="eventsForm__form__input" {...register("title")} autoComplete="off" />
            {errors.title && <p className="eventsForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.title?.message}</p>}
          </div>
          <div className="eventsForm__form-controls">
            <label className="eventsForm__form__label">Date</label>
            <Controller
              name="eventDate"
              control={control}
              render={({field})=>(
                <ReactDatepicker
                  className="eventsForm__form__input"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                  minDate ={new Date()}
                  placeholderText="Click to select date"
                />
              )}
            />
            {errors.eventDate && <p className="eventsForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.eventDate?.message}</p>}
          </div>
        </div>
        <div className="eventsForm__form-row">
          <div className="eventsForm__form-controls">
            <label className="eventsForm__form__label">Budget</label>
            <input className="eventsForm__form__input" {...register("budget")} autoComplete="off" />
            {errors.budget && <p className="eventsForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.budget?.message}</p>}
          </div>
          <div className="eventsForm__form-controls">
            <label className="eventsForm__form__label">Number of Guests Aprox*</label>
            <input className="eventsForm__form__input" {...register("guests")} autoComplete="off" />
            {errors.guests && <p className="eventsForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.guests?.message}</p>}
          </div>
        </div>
        <div className="eventsForm__form-controls--text">
          <label className="eventsForm__form__label">Description</label>
          <textarea className="eventsForm__form__input--text" { ...register("description")} />
        </div>
        <div className="eventsForm__form-actions">
          {action && action === 'Add New' && <Link to="/" className="eventsForm__form-actions__link">Cancel</Link>}
          {action && action === 'Edit' && <Link to={`/events/${match.params.eventId}`} className="eventsForm__form-actions__link">Cancel</Link>}
          {action === 'Add New' && <button className="eventsForm__form-actions__button"><Icon name="add"/>Create  Event</button> }
          {action === 'Edit' && <button className="eventsForm__form-actions__button"><Icon name="save"/>Update  Event</button> }
        </div>
      </form>
    </main>
  )
}

