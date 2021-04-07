import { Component } from 'react'
import './EventForm.scss'
import DatePicker from '../DatePicker/DatePicker'
import moment from 'moment'
import axios from 'axios'
import  { url } from '../../config'
import {Link, useHistory} from 'react-router-dom'



class EventsForm extends Component {
  state = {
    eventTitle: '',
    budget: '',
    description:'',
    eventDate: ((new Date())),
    guestsNumber:'',
    eventToEdit: null
  }

  componentDidMount() {
    console.log(this.props.match)
    if(this.props.action === "Edit"){
      axios.get(`${url}events/${this.props.match.params.eventId}`)
        .then(response => {
          console.log(response.data.budget.amount)
          this.setState({
            eventTitle: response.data.title,
            description: response.data.description,
            budget: response.data.budget.amount,
            eventDate: new Date(response.data.eventDate),
            guestsNumber:response.data.guests,
          })
        })

    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value})
  }

  handleDateChange = (date) => {
    console.log(date)
    this.setState({
      eventDate: date
    })
  }

  handleSubmit =(e) =>{
    e.preventDefault()
    axios.post(`${url}events`,{
      title: this.state.eventTitle,
      description: this.state.description,
      budget: {
        "amount":this.state.budget,
        "currency": "CAD"
      },
      eventDate: this.state.eventDate,
      guets: this.state.guestsNumber
    })
      .then(res =>{
        console.log(res)
      })
  }

  handleUpdate = (e) => {
    e.preventDefault()
    axios.put(`${url}events/${this.props.match.params.eventId}`,{
      id: this.props.match.params.eventId,
      title: this.state.eventTitle,
      description: this.state.description,
      budget: {
        "amount":this.state.budget,
        "currency": "CAD"
      },
      eventDate: this.state.eventDate,
      guets: this.state.guestsNumber
      })
      .then(()=>{
        this.props.handleUpdate()
        this.props.history.goBack()
      })
  }

  handleClick() {
    console.log(this.props)
    this.props.action ==="Edit"? this.props.history.goBack() : this.props.history.push('/')
  }



  render() {
    return(
      <main className="add-event">
        <h2 className="add-event__header">{this.props.action} Event</h2>
        <form className="add-event__form" onSubmit={(this.props.action ==="Edit")? this.handleUpdate : this.handleSubmit}>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Event Title</label>
              <input name={'eventTitle'}
                     onChange={this.handleChange}
                     value={this.state.eventTitle}
                     className="add-event__form__input" type="text"/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Date</label>
              <DatePicker name={'eventDate'} selected={this.state.eventDate}  onChange={this.handleDateChange} />
            </div>
          </div>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Budget</label>
              <input className="add-event__form__input" name={'budget'} value={this.state.budget} onChange={this.handleChange} type="text"/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Number of Guests Aprox*</label>
              <input className="add-event__form__input"
                     name={'guestsNumber'}
                     onChange={this.handleChange}
                     value={this.state.guestsNumber}
                     type="text"/>
            </div>
          </div>
          <div className="add-event__form__controls--text">
            <label className="add-event__form__label">Description</label>
            <textarea className="add-event__form__input--text" name={'description'} onChange={this.handleChange} value={this.state.description}
            ></textarea>
          </div>
          <div className="add-event__form__actions">
            <button onClick={() => {this.handleClick()}} className="add-event__form__submit--cancel" >Cancel</button>
            <button className="add-event__form__submit">
              {this.props.action} Event
              <span className="material-icons add-event__form__submit__icon">add</span>
            </button>
          </div>
        </form>
      </main>
    )
  }
}

export default EventsForm;