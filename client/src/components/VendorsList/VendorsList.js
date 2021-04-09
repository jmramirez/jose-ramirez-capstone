import './VendorsList.scss'
import Vendor from '../Vendor/Vendor'

const VendorList = ({ vendors, eventId }) => {
  return(
    <ul>
      {vendors.map(vendor => {
        return <li key={vendor.id}><Vendor vendor={vendor} eventId={eventId}/></li>
      })}
    </ul>
  )
}

export default VendorList