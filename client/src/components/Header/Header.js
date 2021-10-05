import './Header.scss'
import { Link } from 'react-router-dom';


export const Header = ({ handleLogout, user }) => (
  <header className="header">
    <nav className="header__nav">
      <Link to='/' className="header__nav__heading-link">
        Party Agile
      </Link>
      <div className="header__nav__right">
        {user && user.role=== 'Vendor' && <p className="header__nav__right-user">Vendor: {user.vendor.name}</p>}
        {user && user.role=== 'Planner' && <p className="header__nav__right-user">{`Planner: ${user.name}`}</p>}
        <div className="header__nav__right-actions">
          <Link to="/" className="header__nav__right__link">Events</Link>
          <button className="header__nav__right__button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  </header>
)