import './PageHeader.scss'
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

export const PageHeader = ({ elementType, buttonText, handleChange}) => {


  const handleTiming = (e) => {
    handleChange(e.target.value)
  }

  return (
    <div className="pageHeader">
      <div className="pageHeader__header">
        <h2 className="pageHeader__header-heading">List of {elementType}</h2>
        <select className="pageHeader__header-select" id="events" defaultValue="newEvents" onChange={handleTiming}>
          <option value="newEvents" className="pageHeader__header-select-option">Next Events</option>
          <option value="oldEvents" className="pageHeader__header-select-option">Past Events</option>
        </select>
      </div>
      <div className="pageHeader__actions">
        <Link to={`/${elementType.toLowerCase()}/addEvent`} className="pageHeader__actions-link">
          <Icon name="add"/><p className="pageHeader__actions-link__text">{buttonText}</p>
        </Link>
      </div>
    </div>
  )
}