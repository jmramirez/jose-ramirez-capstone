import  { url } from '../../config'
import './VendorForm.scss'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Icon} from '../Icon/Icon';

const schema = yup.object().shape({
  type: yup.string().required("Vendor type is required"),
  name:  yup.string().required("Vendor Name is required"),
  contactEmail:  yup.string().required("Vendor Email is required"),
  budget: yup.number().typeError('Budget is required, should be a number').min(0, "Budget should be greater than 0"),
  depositPaid: yup.number().typeError('Deposit Paid is required, should be a number').min(0, "Deposit Paid should be greater than 0"),
})


export const VendorForm = ({match , action, children, handleUpdate, user }) => {
  const [addNew, setAddNew] = useState(false)
  const [loading, setLoading] = useState(true)
  const [vendors, setVendors] = useState([])
  const [vendorId, setVendorId] = useState('')
  const { register, handleSubmit, formState: { errors }, setValue} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const [selected, setSelected] = useState(false)
  const history = useHistory()

  useEffect(() => {
    console.log('here')
    axios.get(`${url}vendor`)
      .then(response => {
        if(response.data.length){
          setVendors(response.data)
        }
        else {
          setAddNew(true)
        }
        setLoading(false)
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
    history.goBack()
  }

  const handleNew = () => {
    setAddNew(true)
  }

  const handleChange = (e) => {
    setVendorId(e.target.value)
    setSelected(true)
  }

  return(
    loading ? <h2>Loading...</h2>
      :
    <main className="vendorForm">
      <div className="vendorForm__header">
        <h2>{action} Vendor</h2>
        {!addNew && action==="Add" &&(
          <button className="vendorForm__header__action" onClick={handleNew} type="button">
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
              defaultValue="Please Select Vendor"
              className="vendorForm__form__existing__select"
              onChange={handleChange}
              {...register("vendorId")}
            >
              <option disabled value="Please Select Vendor">Please Select Vendor</option>
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
        <div className="vendorForm__form__row">
          <div className="vendorForm__form__row-controls">
            <label className="vendorForm__form__row-controls__label">Vendor Type</label>
            <input className="vendorForm__form__row-controls__input" type="text" name={'type'} {...register("type",{required:true})} autoComplete="off"/>
            {errors.type &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.type?.message}</p>}
          </div>
          <div className="vendorForm__form__row-controls">
            <label className="vendorForm__form__row-controls__label">Vendor Name</label>
            <input className="vendorForm__form__row-controls__input" type="text" name={'name'}  {...register("name",{required:true})} autoComplete="off"/>
            {errors.name &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.name?.message}</p>}
          </div>
        </div>
        <div className="vendorForm__form__row">
          <div className="vendorForm__form__row-controls">
            <label className="vendorForm__form__row-controls__label">Contact Name</label>
            <input className="vendorForm__form__row-controls__input" type="text" name={'contactName'}  {...register("contactName")} autoComplete="off"/>
          </div>
          <div className="vendorForm__form__row-controls">
            <label className="vendorForm__form__row-controls__label">Contact Email</label>
            <input className="vendorForm__form__row-controls__input" type="text" name={'contactEmail'} {...register("contactEmail", {required: true})} autoComplete="off"/>
            {errors.contactEmail &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.contactEmail?.message}</p>}
          </div>
        </div>
        <div className="vendorForm__form__row vendorForm__form__row--text">
          <label className="vendorForm__form__row-controls__label">Address</label>
          <textarea className="vendorForm__form__row-controls__inputText"  name={'address'}  {...register("address")} autoComplete="off" />
        </div>
        <div className="vendorForm__form__row">
          <div className="vendorForm__form__row-controls">
            <label className="vendorForm__form__row-controls__label">Budget</label>
            <input className="vendorForm__form__row-controls__input" type="text" name={'budget'}  {...register("budget")} autoComplete="off"/>
            {errors.budget &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.budget?.message}</p>}
          </div>
          <div className="vendorForm__form__row-controls">
            <label className="vendorForm__form__row-controls__label">Deposit Paid</label>
            <input className="vendorForm__form__row-controls__input" type="text"  name={'depositPaid'}  {...register("depositPaid")} autoComplete="off"/>
            {errors.depositPaid &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.depositPaid?.message}</p>}
          </div>
        </div>
          </>
          )}
        <div className="vendorForm__form__actions">
          <button onClick={handleClick} className="vendorForm__form__actions__button" type="button">Cancel</button>
          <button className="vendorForm__form__actions__button">
            <Icon name="add" />
            {action} Vendor
          </button>
        </div>
      </form>
    </main>
  )
}