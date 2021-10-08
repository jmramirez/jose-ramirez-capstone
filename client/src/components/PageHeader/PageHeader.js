import './PageHeader.scss'
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

export const PageHeader = ({ elementType, buttonText, handleChange, user}) => {


  const handleTiming = (e) => {
    handleChange(e.target.value)
  }

  return (
    <div className={"pageHeader" + (user && user.role==='Vendor' ?' pageHeader--vendor' : '')}>
      <div className="pageHeader__actions">
        <select className="pageHeader__header-select" id="events" defaultValue="newEvents" onChange={handleTiming}>
          <option value="newEvents" className="pageHeader__header-select-option">Next Events</option>
          <option value="oldEvents" className="pageHeader__header-select-option">Past Events</option>
        </select>
        {user && user.role === 'Planner' && (
          <Link to={`/${elementType.toLowerCase()}/addEvent`} className="pageHeader__actions-link">
            <Icon name="add"/><p className="pageHeader__actions-link__text">{buttonText}</p>
          </Link>
        )}
        {user && user.role === 'Vendor' &&(
          <Link to={`/${elementType.toLowerCase()}/${user.vendor.id}/editVendor`} className="pageHeader__actions-link">
            <Icon name="mode_edit"/><p className="pageHeader__actions-link__text">{buttonText}</p>
          </Link>
        )}
      </div>
      <div className={"pageHeader__header" + (user && user.role==='Vendor' ?' pageHeader__header--vendor' : '')}>
        <h2 className="pageHeader__header-heading">
          {user && user.role === 'Planner' && `List of ${elementType}`}
          {user && user.role === 'Vendor' && 'Events Assigned'}
        </h2>
        {user && user.role === 'Vendor' &&(
          <div className="pageHeader__vendor-info">
            <p className="pageHeader__vendor-info__label"><span className="pageHeader__vendor-info__label--heading">Vendor Name:</span> {user.vendor.name}</p>
            <p className="pageHeader__vendor-info__label"><span className="pageHeader__vendor-info__label--heading">Vendor Type:</span> {user.vendor.type}</p>
          </div>
        )}
      </div>

    </div>
  )
}