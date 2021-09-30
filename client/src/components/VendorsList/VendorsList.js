import './VendorsList.scss'
import VendorItem from '../VendorItem/VendorItem'

const VendorList = ({ vendors, eventId }) => {
  return(
    <>
      <h2 className="vendors-heading">Vendors:</h2>
      <ul className="vendors-list">
        {vendors.length === 0?
          <li className="vendors-list__no-vendors">
            <h2 className="vendors-list__no-vendors__header">There are not vendors assigned to this event</h2>
          </li>
          :
          (vendors.map(vendor =>(
            <li key={vendor.id}>
              <VendorItem vendor={vendor} eventId={eventId}/>
            </li>
          )))
        }
      </ul>
    </>
  )
}

export default VendorList