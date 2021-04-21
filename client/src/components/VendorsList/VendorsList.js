import './VendorsList.scss'
import Vendor from '../Vendor/Vendor'

const VendorList = ({ vendors, eventId }) => {
  return(
    <ul className="vendor-list">
      {vendors.length === 0?
        <li className="vendor-list__no-vendors">
          <h2 className="vendor-list__no-vendors__header">There are not vendors assigned to this event</h2>
        </li>
        :
        (vendors.map(vendor =>(
          <li key={vendor.id}>
            <Vendor vendor={vendor} eventId={eventId}/>
          </li>
        )))
      }
    </ul>
  )
}

export default VendorList