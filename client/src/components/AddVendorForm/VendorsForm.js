import { Component } from 'react'
import  { url } from '../../config'


import './AddVendorForm.scss'
import axios from 'axios'


class  VendorsForm extends Component {
  state = {
    name: '',
    type: '',
    contactName: '',
    contactEmail: '',
    address: '',
    budget:'',
    depositPaid: ''
  }

  componentDidMount() {
    console.log(this.props.children.params)
    if(this.props.action === "Edit"){
      axios.get(`${url}vendor/${this.props.children.params.vendorId}`)
        .then(response => {
          console.log(response)
          this.setState({
            name: response.data.name,
            type: response.data.type,
            contactName: response.data.contactName,
            contactEmail: response.data.contactEmail,
            address: response.data.address,
            budget: response.data.budget.amount,
            depositPaid: response.data.depositPaid.amount,
          })
          console.log(response.data)
        })
    }


  }

  handleUpdate = (e) => {
    e.preventDefault()
    axios.put(`${url}vendor/${this.props.children.params.vendorId}`,{
      id:this.props.children.params.vendorId,
      name: this.state.name,
      type: this.state.type,
      contactName: this.state.contactName,
      contactEmail: this.state.contactEmail,
      address: this.state.address,
      budget: {
        "amount":this.state.budget,
        "currency": "CAD"
      },
      depositPaid: {
        "amount":this.state.depositPaid,
        "currency": "CAD"
      }
    })
      .then(() =>{
        this.props.handleUpdate()
        this.props.history.push(`/getevent/${this.props.children.params.eventId}`)
      })
  }

  handleChange = (e) => {
    const { name, value} = e.target
    this.setState({ [name]: value })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${url}vendor/`,{
      name : this.state.name,
      type: this.state.type,
      contactName: this.state.contactName,
      contactEmail: this.state.contactEmail,
      address: this.state.address,
      budget: {
        "amount":this.state.budget,
        "currency": "CAD"
      },
      depositPaid: {
        "amount":this.state.depositPaid,
        "currency": "CAD"
      },
      "eventId": this.props.children.params.eventId
    })
      .then(() => {
        this.props.history.push(`/getevent/${this.props.children.params.eventId}`)
      })
  }

  handleClick() {
    console.log(this.props)
    this.props.history.push(`/getevent/${this.props.children.params.eventId}`)
  }

  render() {
    return(
      <main className="add-event">
        <h2 className="add-event__header">{this.props.action} Vendor</h2>
        <form className="add-event__form"  onSubmit={(this.props.action ==="Edit")? this.handleUpdate : this.handleSubmit}>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Vendor Type</label>
              <input className="add-event__form__input" type="text" name={'type'} value={this.state.type} onChange={this.handleChange}/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Vendor Name</label>
              <input className="add-event__form__input" type="text" name={'name'} value={this.state.name} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Contact Name</label>
              <input className="add-event__form__input" type="text" name={'contactName'} value={this.state.contactName} onChange={this.handleChange}/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Contact Email</label>
              <input className="add-event__form__input" type="text" name={'contactEmail'} value={this.state.contactEmail} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="add-event__form__controls--text">
            <label className="add-event__form__label">Address</label>
            <textarea className="add-event__form__input--text"  name={'address'} value={this.state.address} onChange={this.handleChange}></textarea>
          </div>
          <div className="add-event__form-row">
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Budget</label>
              <input className="add-event__form__input" type="text" name={'budget'} value={this.state.budget} onChange={this.handleChange}/>
            </div>
            <div className="add-event__form__controls">
              <label className="add-event__form__label">Deposit Paid</label>
              <input className="add-event__form__input" type="text"  name={'depositPaid'} value={this.state.depositPaid} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="add-event__form__actions">
            <button onClick={() => this.handleClick()} className="add-event__form__submit--cancel">Cancel</button>
            <button className="add-event__form__submit">
              {this.props.action} Vendor
              <span className="material-icons add-event__form__submit__icon">add</span>
            </button>
          </div>
        </form>
      </main>
    )
  }
}




export default VendorsForm;