import './MainPage.scss'
import LoginForm from '../../components/LogInForm/LogInForm'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const MainPage = ({ handleLogin }) => {
  return(
    <div  className="mainPage">
        <div className="mainPage-container">
          <div className="mainPage__image">

            <div className="mainPage__image-overlay">
                <h1 className="mainPage__heading">Party Agile</h1>
                <p className="mainPage__sub-heading">Allow us to keep your events organized</p>
            </div>
          </div>
          <div className="mainPage__content">
            {/*<RegisterForm />*/}
            <LoginForm handleLogin={handleLogin}/>
          </div>
        </div>
    </div>
  )
}

export default MainPage;