import './Header.scss'
import { Link } from 'react-router-dom';


export const Header = () => (
  <header className="header">
    <nav className="header__nav">
      <Link to='/' className="header__nav__heading-link">
        Party Agile
      </Link>
      <div className="header__nav__right">
        <p className="header__nav__right-user">Jose Ramirez</p>
        <div className="header__nav__right-actions">
          <Link to="/" className="header__nav__right__link">Events</Link>
          <Link to="/" className="header__nav__right__link">Logout</Link>
        </div>
      </div>
    </nav>
  </header>
)