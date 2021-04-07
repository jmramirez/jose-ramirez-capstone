import './Sidebar.scss'

const Sidebar = ({ events, handleClick }) => {



  return(
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-header__title">Party Agile</h1>
      </div>
      <div className="sidebar-events">
        <h3 className="sidebar-events__title">List of Events</h3>
        <ul className="events">
          {
            events.length===0 ?
              <li><p className="event-name">You have no future events</p></li>:
            events.map(event =>{
            return(
              <li className="events-items" onClick={() => {handleClick(event.id)}} key={event.id}>
                <p className="event-name">{event.title}</p>
                <p className="event-date">Date: { new Date(event.eventDate).toLocaleDateString()}</p>
              </li>
            )
          })}
          <li className="event-add"><span className="material-icons event-add__icon">add</span>Add New Event</li>
          </ul>
      </div>
    </div>
  )
}

export default Sidebar;