import  { url } from '../../config'
import './VendorForm.scss'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Icon} from '../Icon/Icon';


const schema = yup.object().shape({
  addNew: yup.boolean(),
  vendors: yup.mixed("Please select").when("addNew",{is: false, then: yup.mixed("Please select").notOneOf(['Please Select Vendor'], "Please select a vendor from the list")}),
  type: yup.string().when("addNew",{is: true, then: yup.string().required("Vendor type is required"), otherwise: yup.string().notRequired()}),
  name:  yup.string().when("addNew",{is: true, then: yup.string().required("Vendor Name is required"), otherwise: yup.string().notRequired()}),
  contactEmail:  yup.string().when("addNew",{is: true, then: yup.string().required("Vendor Email is required"), otherwise: yup.string().notRequired()}),
  budget: yup.number().when("addNew",{is: false, then: yup.number().typeError('Budget is required, should be a number').min(0, "Budget should be greater than 0"), otherwise: yup.number().notRequired().nullable()}),
  depositPaid: yup.number().when("addNew",{is: false, then: yup.number().typeError('Deposit Paid is required, should be a number').min(0, "Deposit Paid should be greater than 0"), otherwise: yup.number().notRequired().nullable()}),
  budgetNew: yup.number().when("addNew",{is: true, then: yup.number().typeError('Budget is required, should be a number').min(0, "Budget should be greater than 0"), otherwise: yup.number().notRequired().nullable()}),
  depositPaidNew: yup.number().when("addNew",{is: true, then: yup.number().typeError('Deposit Paid is required, should be a number').min(0, "Deposit Paid should be greater than 0"), otherwise: yup.number().notRequired().nullable()}),
})

export const VendorForm = ({match , action, children, authenticated,  handleUpdate}) => {

  const [addNew, setAddNew] = useState(false)
  const [loading, setLoading] = useState(true)
  const [vendors, setVendors] = useState([])

  const { register, handleSubmit, formState: { errors }, setValue, clearErrors,getValues, reset} = useForm({
    addNew: addNew,
    defaultValues: {
      budget: null,
      depositPaid: null,
      budgetNew: null,
      depositPaidNew: null
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })
  const [selected, setSelected] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const getVendors = (auth, vendorId) => {
      axios.get(`${url}vendors/${vendorId}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      })
        .then(response => {
          if (response.data.length) {
            setVendors(response.data)
          } else {
            setAddNew(true)
            reset({...getValues(), addNew: true})
          }
          setLoading(false)
        })
    }
    if(authenticated && match.params.eventId) {
      getVendors(authenticated, match.params.eventId)
    }
  }, [authenticated, match.params.eventId])

  useEffect(() => {
    if(action === 'Edit'){
      axios.get(`${url}vendor/${match.params.vendorId}`)
        .then(response => {
          const fields = ['name', 'type','contactName','contactEmail', 'address']
          fields.forEach(field => setValue(field, response.data[field]))
          setLoading(false)
        })
    }
  },[match.params.vendorId, setValue, action])

  const onSubmit = (data) => {
    console.log(data)
    if(action ==="Add"){
      {addNew ?(
        axios.post(`${url}vendor/`,{
          name: data.name,
          type: data.type,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          address: data.address,
          budget: {
            "amount": data.budgetNew,
            "currency": "CAD"
          },
          depositPaid: {
            "amount": data.depositPaidNew,
            "currency": "CAD"
          },
          "eventId" : match.params.eventId
        })
          .then(response => {
            history.push(`/events/${match.params.eventId}`)
          }))
      :
        (axios.post(`${url}vendor/event`,{
          eventId: match.params.eventId,
          vendorId: data.vendors,
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
              history.push(`/events/${match.params.eventId}`)
        }))
      }
    }

    if(action ==='Edit'){
      axios.put(`${url}vendor/${match.params.vendorId}`,{
        id:match.params.vendorId,
        name: data.name,
        type: data.type,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        address: data.address
      })
        .then((response) =>{
          handleUpdate("vendor")
          history.push(`/vendors/${match.params.vendorId}`)
        })
    }
  }


  const handleClick =() => {
    history.goBack()
  }

  const handleNew = (event) => {
    setAddNew(event.target.checked)
    reset({...getValues() ,
      addNew: event.target.checked,
      vendors: 'Please Select Vendor',
      type:'',
      name:'',
      contactName:'',
      contactEmail: '',
      budget: null,
      depositPaid: null,
      budgetNew: null,
      depositPaidNew: null
    })
    clearErrors()
  }

  const handleChange = (e) => {
    setSelected(true)
  }

  return(
    loading ? <h2>Loading...</h2>
      :
    <main className="vendorForm">
      <div className="vendorForm__header">
        <h2>{action} Vendor</h2>

      </div>
      <form className="vendorForm__form" onSubmit={handleSubmit(onSubmit)}>
        {action ==="Add" && (
          <div className="vendorForm__form__row-controls vendorForm__form__row-controls--check">
            <input type="checkbox" {...register("addNew")} onChange={handleNew} className="vendorForm__form__row-controls--check__checkbox"/>
            <label className="vendorForm__form__row-controls__label">New Vendor</label>
          </div>
        )}
        {(!addNew && action ==="Add") ?
          <div className="vendorForm__form__existing">
            <select
              id="vendors"
              value={vendors.id}
              className="vendorForm__form__existing__select"
              defaultValue="Please Select Vendor"
              onChange={handleChange}
              {...register("vendors", {required:true})}
            >
              <option disabled value="Please Select Vendor" className="vendorForm__form__existing__select-option">Please Select Vendor</option>
              {vendors.map(vendor =>(
                <option key={vendor.id} value={vendor.id} className="vendorForm__form__existing__select-option">Name: {vendor.name} </option>
              ))}
            </select>
            {errors.vendors &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.vendors?.message}</p>}
            <div className="vendorForm__form__existing__row">
              <div className="vendorForm__form__existing__row-controls">
                <label className="vendorForm__form__existing__row-controls__label">Budget</label>
                <input className="vendorForm__form__existing__row-controls__input" type="text" name={'budget'}  {...register("budget")} autoComplete="off"/>
                {errors.budget &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.budget?.message}</p>}
              </div>
              <div className="vendorForm__form__existing__row-controls">
                <label className="vendorForm__form__existing__row-controls__label">Deposit Paid</label>
                <input className="vendorForm__form__existing__row-controls__input" type="text"  name={'depositPaid'}  {...register("depositPaid")} autoComplete="off"/>
                {errors.depositPaid &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.depositPaid?.message}</p>}
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
            <input className={action==="Edit"? "vendorForm__form__row-controls__input vendorForm__form__row-controls__input--disabled" : "vendorForm__form__row-controls__input"} type="text" name={'contactEmail'} {...register("contactEmail", {required: true})} autoComplete="off" disabled={action ==="Edit"? "disabled":""}/>
            {errors.contactEmail &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.contactEmail?.message}</p>}
          </div>
        </div>
        <div className="vendorForm__form__row vendorForm__form__row--text">
          <label className="vendorForm__form__row-controls__label">Address</label>
          <textarea className="vendorForm__form__row-controls__inputText"  name={'address'}  {...register("address")} autoComplete="off" />
        </div>
        {action === "Add" && (
          <div className="vendorForm__form__row">
            <div className="vendorForm__form__row-controls">
              <label className="vendorForm__form__row-controls__label">Budget</label>
              <input className="vendorForm__form__row-controls__input" type="text" name={'budgetNew'}  {...register("budgetNew")} autoComplete="off"/>
              {errors.budgetNew &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.budgetNew?.message}</p>}
            </div>
            <div className="vendorForm__form__row-controls">
              <label className="vendorForm__form__row-controls__label">Deposit Paid</label>
              <input className="vendorForm__form__row-controls__input" type="text"  name={'depositPaidNew'}  {...register("depositPaidNew")} autoComplete="off"/>
              {errors.depositPaidNew &&<p className="vendorForm__error"><span className="material-icons eventsForm__error-icon">error</span>{errors.depositPaidNew?.message}</p>}
            </div>
          </div>
        )}
          </>
          )}
        <div className="vendorForm__form__actions">
          <button onClick={handleClick} className="vendorForm__form__actions__button" type="button">Cancel</button>
          {action && action === 'Edit' &&
            <button className="vendorForm__form__actions__button">
              <Icon name="save" />
              Save Changes
            </button>
          }
          {
            action && action === 'Add' &&
            <button className="vendorForm__form__actions__button">
              <Icon name="add" />
              {action} Vendor
            </button>
          }
        </div>
      </form>
    </main>
  )
}