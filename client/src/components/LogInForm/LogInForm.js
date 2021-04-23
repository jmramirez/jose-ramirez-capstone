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
        <button className="logIn-form__button" >No account? Create one!</button>
        <input className="logIn-form__submit" type="submit" value="Log In"/>

      </form>
    </>
  )
}

export default LoginForm;
