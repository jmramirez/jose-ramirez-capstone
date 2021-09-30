import './VendorItem.scss'
import {Link} from 'react-router-dom'
import {Icon} from '../Icon/Icon';

const VendorItem = ({ vendor, eventId }) => {
  return(
    <main className="vendor-item">
      <div className="vendor-item__header">
        <h2 className="vendor-item__header-heading">
          { vendor.name }
        </h2>
        <div className="vendor-item__header-actions">
          <Link to={`/vendor/edit/${vendor.id}/${eventId}`} className="vendor-item__header-actions__link">
            <Icon name="edit_note"/><p className="vendor-item__header-actions__link-text">Edit Vendor</p>
          </Link>
        </div>
      </div>
      <div className="vendor-item__info">
        <p className="vendor-item__type">Type: {vendor.type}</p><p className="vendor-item__type">Budget: {vendor.budget.currency} {vendor.budget.amount}</p><p className="vendor-item__type">Deposit Paid: {vendor.depositPaid.currency} {vendor.depositPaid.amount}</p>
      </div>
    </main>
  )
}

export default  VendorItem;