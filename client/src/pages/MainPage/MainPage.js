import './MainPage.scss'
import initialImage  from '../../assets/images/initial-page-image.jpg'
import LoginForm from '../../components/LogInForm/LogInForm'

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
            <LoginForm />
          </div>
        </div>
    </div>
  )
}

export default MainPage;