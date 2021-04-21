import './VendorsList.scss'
import Vendor from '../Vendor/Vendor'

const VendorList = ({ vendors, eventId }) => {
  return(
    <ul>
      {vendors.length === 0? <li>There are no vendors</li>
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