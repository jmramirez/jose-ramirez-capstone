import './RegisterForm.scss'

const RegisterForm = () => {
  return(
    <>
      <h2 className="signUp-form__heading">Sign In</h2>
      <form className="signUp-form">
        <div className="signUp-form__fullName">
          <div>
            <label className="signUp-form__label">First Name</label>
            <input type="text" className="signUp-form__input"/>
          </div>
          <div>
            <label className="signUp-form__label">Last Name</label>
            <input type="text" className="signUp-form__input"/>
          </div>
        </div>
        <label className="signUp-form__label">Email address</label>
        <input type="text" className="signUp-form__input"/>
        <label className="signUp-form__label">Password</label>
        <input type="text" className="signUp-form__input"/>
        <label className="signUp-form__label">Confirm Password</label>
        <input type="text" className="signUp-form__input"/>
        <input type="submit" value="Sign Up" className="signUp-form__submit"/>
      </form>
    </>
  )
}

export default RegisterForm;