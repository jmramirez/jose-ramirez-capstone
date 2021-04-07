import { Component } from 'react'
import './EventForm.scss'
import DatePicker from '../DatePicker/DatePicker'


class EventForm extends Component {
  state = {}

  render() {
    return(
      <main className="add-event">
        <h2 className="add-event__header">{this.props.action} Event</h2>
        <form className="add-event__form">
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Event Title</label>
              <input className="add-event__form__input" type="text"/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Date</label>
              <DatePicker />
            </div>
          </div>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Budget</label>
              <input className="add-event__form__input" type="text"/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Number of Guests Aprox*</label>
              <input className="add-event__form__input" type="text"/>
            </div>
          </div>
          <div className="add-event__form__controls--text">
            <label className="add-event__form__label">Description</label>
            <textarea className="add-event__form__input--text"></textarea>
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