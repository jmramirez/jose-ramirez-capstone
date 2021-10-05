import './PageHeader.scss'
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

export const PageHeader = ({ elementType, buttonText, handleChange, user}) => {


  const handleTiming = (e) => {
    handleChange(e.target.value)
  }

  return (
    <div className={"pageHeader" + (user && user.role==='Vendor' ?' pageHeader--vendor' : '')}>
      <select className="pageHeader__header-select" id="events" defaultValue="newEvents" onChange={handleTiming}>
        <option value="newEvents" className="pageHeader__header-select-option">Next Events</option>
        <option value="oldEvents" className="pageHeader__header-select-option">Past Events</option>
      </select>
      {user && user.role === 'Vendor' &&(
        <div className="pageHeader__vendor-info">
          <p><span>Vendor Name:</span> {user.vendor.name}</p>
          <p><span>Vendor Type:</span> {user.vendor.type}</p>
        </div>
      )}
      <div className="pageHeader__header">
        <h2 className="pageHeader__header-heading">
          {user && user.role === 'Planner' && `List of ${elementType}`}
          {user && user.role === 'Vendor' && 'Events Assigned'}
        </h2>
        {user && user.role === 'Planner' && (
          <div className="pageHeader__actions">
            <Link to={`/${elementType.toLowerCase()}/addEvent`} className="pageHeader__actions-link">
              <Icon name="add"/><p className="pageHeader__actions-link__text">{buttonText}</p>
            </Link>
          </div>
        )}
      </div>

    </div>
  )
}