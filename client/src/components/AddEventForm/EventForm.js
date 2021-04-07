import { Component } from 'react'
import './EventForm.scss'
import DatePicker from '../DatePicker/DatePicker'
import moment from 'moment'
import axios from 'axios'
import  { url } from '../../config'


class EventForm extends Component {
  state = {
    eventTitle: '',
    budget: '',
    description:'',
    eventDate: ((new Date())),
    guestsNumber:''
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

  render() {
    return(
      <main className="add-event">
        <h2 className="add-event__header">{this.props.action} Event</h2>
        <form className="add-event__form" onSubmit={this.handleSubmit}>
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
              <DatePicker name={'eventDate'}  onChange={this.handleDateChange} />
            </div>
          </div>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Budget</label>
              <input className="add-event__form__input" name={'budget'} onChange={this.handleChange} type="text"/>
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
            <input className="add-event__form__submit--cancel" type="Cancel" value="Cancel"/>
            <button className="add-event__form__submit">
              Add Event
              <span className="material-icons add-event__form__submit__icon">add</span>
            </button>
          </div>
        </form>
      </main>
    )
  }
}

export default EventForm;