import { Component } from 'react'


import './AddVendorForm.scss'


class  VendorsForm extends Component {
  render() {
    return(
      <main className="add-event">
        <h2 className="add-event__header">Include Vendor</h2>
        <form className="add-event__form">
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Vendor Type</label>
              <input className="add-event__form__input" type="text"/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Vendor Name</label>
              <input className="add-event__form__input" type="text"/>
            </div>
          </div>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Contact Name</label>
              <input className="add-event__form__input" type="text"/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Contact Email</label>
              <input className="add-event__form__input" type="text"/>
            </div>
          </div>
          <div className="add-event__form__controls--text">
            <label className="add-event__form__label">Address</label>
            <textarea className="add-event__form__input--text"></textarea>
          </div>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Budget</label>
              <input className="add-event__form__input" type="text"/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Deposit Paid</label>
              <input className="add-event__form__input" type="text"/>
            </div>
          </div>
          <div className="add-event__form__actions">
            <input className="add-event__form__submit--cancel" type="Cancel" value="Cancel"/>
            <button className="add-event__form__submit">
              Add Vendor
              <span className="material-icons add-event__form__submit__icon">add</span>
            </button>
          </div>
        </form>
      </main>
    )
  }
}




export default VendorsForm;