import { Component } from 'react'
import  { url } from '../../config'


import './AddVendorForm.scss'
import axios from 'axios'
import {VendorsSelect} from '../VendorsSelect/VendorsSelect'
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Icon} from '../Icon/Icon';


export const VendorsForm = ({match , action, children, handleUpdate, user }) => {
  const [addNew, setAddNew] = useState(false)
  const [vendors, setVendors] = useState([])
  const [vendorId, setVendorId] = useState('')
  const { register, handleSubmit, formState: { errors}, setValue} = useForm()
  const [selected, setSelected] = useState(false)
  const history = useHistory()

  useEffect(() => {
    axios.get(`${url}vendor`)
      .then(response => {
        setVendors(response.data)
      })
  }, [])

  useEffect(() => {
    if(action === 'Edit'){
      axios.get(`${url}vendor/${children.params.vendorId}/${children.params.eventId}`)
        .then(response => {
          console.log(response.data)
          const fields = ['name', 'type','contactName','contactEmail', 'address','depositPaid']
          fields.forEach(field => setValue(field, response.data[field]))
          setValue('budget', response.data.budget.amount)
          setValue('depositPaid', response.data.depositPaid.amount)
        })
    }
  })

  const onSubmit = (data) => {
    console.log(data);
    if(action ==="Add"){
      {addNew ?
      axios.post(`${url}vendor/`,{
        name: data.name,
        type: data.type,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        address: data.address,
        budget: {
          "amount": data.budget,
          "currency": "CAD"
        },
        depositPaid: {
          "amount": data.depositPaid,
          "currency": "CAD"
        },
        "eventId" : children.params.eventId
      })
        .then(()=> {
          history.push(`/getevent/${children.params.eventId}`)
        })
        :
        (axios.post(`${url}vendor/event`,{
          eventId: children.params.eventId,
          vendorId: data.vendorId,
          budget: {
            "amount": data.budget,
            "currency": "CAD"
          },
          depositPaid: {
            "amount": data.depositPaid,
            "currency": "CAD"
          }
        })
          .then(() => {


              history.push(`/getevent/${children.params.eventId}`)
        }))
      }
    }

    if(action ==='Edit'){
      axios.put(`${url}vendor/${children.params.vendorId}`,{
        id:children.params.vendorId,
        eventId: children.params.eventId,
        name: data.name,
        type: data.type,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        address: data.address,
        budget: {
          "amount":data.budget,
          "currency": "CAD"
        },
        depositPaid: {
          "amount":data.depositPaid,
          "currency": "CAD"
        }
      })
        .then(() =>{
          history.push(`/getevent/${children.params.eventId}`)
        })
    }
  }

  const handleClick =() => {
    history.push(`/getevent/${children.params.eventId}`)
  }

  const handleNew = () => {
    setAddNew(true)
  }

  const handleChange = (e) => {
    setVendorId(e.target.value)
    setSelected(true)
  }

  return(
    <main className="vendorForm">
      <div className="vendorForm__header">
        <h2>{action} Vendor</h2>
        {!addNew && action==="Add" &&(
          <button className="vendorForm__header__action" onClick={handleNew}>
            <Icon name="add" />New <span className="vendorForm__header__action__text">&nbsp;Vendor</span>
          </button>
        )}
      </div>



      <form className="vendorForm__form" onSubmit={handleSubmit(onSubmit)}>
        {(!addNew && action ==="Add") ?
          <div className="vendorForm__form__existing">
            <select
              id="vendors"
              name="vendors"
              value={vendors.id}
              className="vendorForm__form__existing__select"
              onChange={handleChange}
              {...register("vendorId")}
            >
              <option value="" disabled selected hidden>Please Select Vendor</option>
              {vendors.map(vendor =>(
                <option value={vendor.id}>Name: {vendor.name} </option>
              ))}
            </select>
            <div className="vendorForm__form__existing__row">
              <div className="vendorForm__form__existing__row-controls">
                <label className="vendorForm__form__existing__row-controls__label">Budget</label>
                <input className="vendorForm__form__existing__row-controls__input" type="text" name={'budget'}  {...register("budget")} autoComplete="off"/>
              </div>
              <div className="vendorForm__form__existing__row-controls">
                <label className="vendorForm__form__existing__row-controls__label">Deposit Paid</label>
                <input className="vendorForm__form__existing__row-controls__input" type="text"  name={'depositPaid'}  {...register("depositPaid")} autoComplete="off"/>
              </div>
            </div>
          </div>
          :(
          <>
        <div className="add-event__form-row">
          <div className="add-event__form__controls">
            <label className="add-event__form__label">Vendor Type</label>
            <input className="add-event__form__input" type="text" name={'type'} {...register("type")} autoComplete="off"/>
          </div>
          <div className="add-event__form__controls">
            <label className="add-event__form__label">Vendor Name</label>
            <input className="add-event__form__input" type="text" name={'name'}  {...register("name")} autoComplete="off"/>
          </div>
        </div>
        <div className="add-event__form-row">
          <div className="add-event__form__controls">
            <label className="add-event__form__label">Contact Name</label>
            <input className="add-event__form__input" type="text" name={'contactName'}  {...register("contactName")} autoComplete="off"/>
          </div>
          <div className="add-event__form__controls">
            <label className="add-event__form__label">Contact Email</label>
            <input className="add-event__form__input" type="text" name={'contactEmail'} {...register("contactEmail")} autoComplete="off"/>
          </div>
        </div>
        <div className="add-event__form__controls--text">
          <label className="add-event__form__label">Address</label>
          <textarea className="add-event__form__input--text"  name={'address'}  {...register("address")} autoComplete="off" />
        </div>
        <div className="add-event__form-row">
          <div className="add-event__form__controls">
            <label className="add-event__form__label">Budget</label>
            <input className="add-event__form__input" type="text" name={'budget'}  {...register("budget")} autoComplete="off"/>
          </div>
          <div className="add-event__form__controls">
            <label className="add-event__form__label">Deposit Paid</label>
            <input className="add-event__form__input" type="text"  name={'depositPaid'}  {...register("depositPaid")} autoComplete="off"/>
          </div>
        </div>
          </>
          )}
        <div className="vendorForm__form__actions">
          <button onClick={handleClick} className="vendorForm__form__actions__button">Cancel</button>
          <button className="vendorForm__form__actions__button">
            <Icon name="add" />
            {action} Vendor

          </button>
        </div>

      </form>

    </main>
  )
}