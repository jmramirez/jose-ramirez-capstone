import './Sidebar.scss'
import {EventList} from '../EventList/EventList'
import {Link} from 'react-router-dom'

const Sidebar = ({ events, user  }) => {
  const role = user.role

  return(
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-header__link">
          <h1 className="sidebar-header__title">Party Agile</h1>
        </Link>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content__header">
          <h3 className="sidebar-content__header-title">List of Events</h3>
        </div>
        <EventList events={events} role={role}/>
      </div>
    </div>
  )
}

export default Sidebar;