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
          <li><p>My Wedding</p></li>
          <li><p>Pandemic Birthday</p></li>
          <li><p>Picnic with my friends</p></li>
          </ul>
      </div>
    </div>
  )
}

export default Sidebar;