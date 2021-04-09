import './Vendor.scss'
import {Link} from 'react-router-dom'

const Vendor = ({ vendor, eventId }) => {
  return(
    <main className="vendor-item">
      <div className="vendor-item__heading">
        <h2 className="vendor-item__header">
          { vendor.name }
        </h2>
        <div className="event__actions">
          <Link to={`/vendor/edit/${vendor.id}/${eventId}`} className="event__addvendor">
            Edit Vendor
          </Link>
        </div>
      </div>
      <div className="vendor-item__info">
        <p className="vendor-item__type">Type: {vendor.type}</p><p className="vendor-item__type">Budget: {vendor.budget.currency} {vendor.budget.amount}</p><p className="vendor-item__type">Deposit Paid: {vendor.depositPaid.currency} {vendor.depositPaid.amount}</p>
      </div>
    </main>
  )
}

export default  Vendor;