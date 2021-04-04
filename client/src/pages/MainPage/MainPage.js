import './MainPage.scss'
import initialImage  from '../../assets/images/initial-page-image.jpg'

const MainPage = () => {
  return(
    <div  className="mainPage">
        <div className="mainPage-container">
          <div className="mainPage__image">

            <div className="mainPage__image-overlay">
                <h1 className="mainPage__heading">Party Agile</h1>
                <p className="mainPage__sub-heading">Allow us to keep your events organize.</p>
            </div>
          </div>
          <div className="mainPage__content">
            <h2 className="mainPage__heading--secondary">Log In</h2>
            <form className="logIn-form">
              <label className="logIn-form__label">Username/Email</label>
              <input className="logIn-form__input" type="text"/>
              <label className="logIn-form__label">Password</label>
              <input className="logIn-form__input" type="text"/>
              <input className="logIn-form__submit" type="submit" value="Log In"/>
            </form>
          </div>
        </div>
    </div>
  )
}

export default MainPage;