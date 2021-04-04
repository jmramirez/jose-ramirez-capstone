import './AddEventForm.scss'

const AddEventForm = () => {
  return(
    <main className="add-event">
      <h2 className="add-event__header">Add New Event</h2>
      <form className="add-event__form">
        <label className="add-event__form__label">Event Title</label>
        <input className="add-event__form__input" type="text"/>
        <label className="add-event__form__label">Date</label>
        <input className="add-event__form__input" type="text"/>
        <label className="add-event__form__label">Budget</label>
        <input className="add-event__form__input" type="text"/>
        <label className="add-event__form__label">Description</label>
        <textarea>Description</textarea>
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

export default AddEventForm;