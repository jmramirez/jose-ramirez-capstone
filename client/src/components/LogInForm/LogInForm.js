import './LoginForm.scss'

const LoginForm = () => {
  return(
    <>
      <h2 className="mainPage__heading--secondary">Log In</h2>
      <form className="logIn-form">
        <label className="logIn-form__label">Username/Email</label>
        <input className="logIn-form__input" type="text"/>
        <label className="logIn-form__label">Password</label>
        <input className="logIn-form__input" type="text"/>
        <input className="logIn-form__submit" type="submit" value="Log In"/>
      </form>
    </>
  )
}

export default LoginForm;
