import './PageHeader.scss'
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

export const PageHeader = ({ elementType, buttonText}) => (
  <div className="pageHeader">
    <div>
      <h2 className="pageHeader-heading">List of {elementType}</h2>
    </div>
    <div>
      <Link to={`/${elementType.toLowerCase()}/add`} className="pageHeader__actions-link">
        <Icon name="add"/><p className="pageHeader__actions-link__text">{buttonText}</p>
      </Link>
    </div>
  </div>
)