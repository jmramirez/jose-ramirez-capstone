import './Sidebar.scss'

const Sidebar = () => {
  return(
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-header__title">Party Agile</h1>
      </div>
      <div className="sidebar-events">
        <h3 className="sidebar-events__title">List of Events</h3>
        <ul className="events">
          <li className="events-items"><p className="event-name">My Wedding</p><p className="event-date">Date: 23/03/2021</p></li>
          <li className="events-items"><p>Pandemic Birthday</p><p className="event-date">Date: 23/03/2021</p></li>
          <li className="events-items"><p>Picnic with my friends</p><p className="event-date">Date: 23/03/2021</p></li>
          <li className="event-add"><spa className="material-icons event-add__icon">add</spa>Add New Event</li>
          </ul>
      </div>
    </div>
  )
}

export default Sidebar;