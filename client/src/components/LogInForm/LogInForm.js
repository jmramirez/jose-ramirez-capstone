import './LoginForm.scss'
import { useForm} from 'react-hook-form'
import { useState} from 'react'
import axios from 'axios'
import {url} from '../../config'
import { useHistory} from 'react-router-dom'

const LoginForm = ({ handleLogin, handleRegister }) => {
  const [success, setSuccess] = useState(true)
  const { register, handleSubmit, formState: { errors }} = useForm();
  const history = useHistory()


  const onSubmit  = (data) => {
    axios.post(`${url}user/auth`,{
      email: data.email,
      password: data.password
    })
      .then(response => {
        handleLogin(response.data)
        history.push('/')
      })
      .catch((e) => {
        console.log(e)
        setSuccess(false)
      })
  }

  const signUp = (e) => {
    e.preventDefault()
    history.push('/signup')
  }
  
  const demoLogin = (e, type) => {
    e.preventDefault()
    let user = {}
    if(type === 'planner') {
      user = {
        email: "demoplanner@example.com",
        password: "partyAgile21"
      }
    }
    if(type === 'vendor') {
      user = {
        email: "demovendor@example.com",
        password: "partyAgile21"
      }
    }
    axios.post(`${url}user/auth`, user)
        .then(response => {
          handleLogin(response.data)
          history.push('/')
        })
        .catch((e) => {
          console.log(e)
          setSuccess(false)
        })
  }
  
  return(
    <>
      <h2 className="logIn-form__heading">Log In</h2>
      <form className="logIn-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="logIn-form__label">Username/Email</label>
        <input className="logIn-form__input" type="text" {...register("email", {required: true})} autoComplete="off"/>
        {errors.email &&( <p className="logIn-form__error">You must enter username</p>)}
        <label className="logIn-form__label">Password</label>
        <input className="logIn-form__input" type="password" autoComplete="off" {...register("password", { required: true})}/>
        {errors.password &&( <p className="logIn-form__error">You must enter password</p>)}
        {!success &&( <p className="logIn-form__error">User not found, please try again</p>)}
        <button className="logIn-form__button" type="button" onClick={signUp}>No account? Create one!</button>
        <input className="logIn-form__submit" type="submit" value="Log In"/>
        <div className="logIn-form__demo-actions">
          <input className="logIn-form__demo-actions__buttons" type="button" value="Demo Log In as Planner" onClick={(e) => demoLogin(e,"planner")}/>
          <input className="logIn-form__demo-actions__buttons" type="button" value="Demo Log In as Vendor" onClick={(e) => demoLogin(e,"vendor")}/>
        </div>
      </form>
    </>
  )
}

export default LoginForm;
