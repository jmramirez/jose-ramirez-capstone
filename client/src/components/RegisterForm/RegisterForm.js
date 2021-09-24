import './RegisterForm.scss'
import {useForm} from 'react-hook-form';
import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {url} from '../../config';

const RegisterForm = ({ handleLogin }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(true)
  const { register, handleSubmit, formState: {errors}, watch} = useForm()
  const history = useHistory()
  const password = useRef({})
  password.current = watch("password","")


  const onSubmit = (data, e) => {
    console.log(data)
    axios.post(`${url}user`, {
      email: data.email,
      password:data.password,
      firstName: data.firstName,
      lastName: data.lastName
    })
      .then(response =>{
        console.log(response.data)
        handleLogin(response.data)
        history.push('/')
      })
      .catch((e) => {
        console.log(e.response)
        setSuccess(false)
        setError(e.response.data.message)
      })
  }

  const signIn = (e) => {
    e.preventDefault()
    history.push('signin')
  }

  return(
    <>
      <h2 className="signUp-form__heading">Sign In</h2>
      <form className="signUp-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signUp-form__fullName">
          <div className="signUp-form__fullName__section">
            <label className="signUp-form__label">First Name</label>
            <input type="text" className="signUp-form__input" {...register("firstName", { required: true })}/>
            {errors.firstName && (<p className="logIn-form__error">First Name is required</p>)}
          </div>
          <div className="signUp-form__fullName__section">
            <label className="signUp-form__label">Last Name</label>
            <input type="text" className="signUp-form__input" {...register("lastName", { required: true })}/>
            {errors.lastName && (<p className="logIn-form__error">Last Name is required</p>)}
          </div>
        </div>
        <label className="signUp-form__label">Email address</label>
        <input type="text" className="signUp-form__input" {...register("email", { required: true })}/>
        {errors.email && (<p className="logIn-form__error">Email is required</p>)}
        <label className="signUp-form__label">Password</label>
        <input type="text" className="signUp-form__input" type="password" {...register("password", { required: true })}/>
        {errors.password && (<p className="logIn-form__error">Password is required</p>)}
        <label className="signUp-form__label">Confirm Password</label>
        <input type="text" className="signUp-form__input" type="password"  {...register("passwordConfirmation", {validate: value => value === password.current || "The passwords do not match"})}/>
        {errors.passwordConfirmation &&( <p className="logIn-form__error">{errors.passwordConfirmation.message}</p>)}
        {!success &&( <p className="logIn-form__error">{error}</p>)}
        <button className="logIn-form__button" type="button" onClick={signIn}>Already have an account? Sign in</button>
        <input type="submit" value="Sign Up" className="signUp-form__submit"/>
      </form>
    </>
  )
}

export default RegisterForm;