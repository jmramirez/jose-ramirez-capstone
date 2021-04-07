import './VendorsList.scss'
import Vendor from '../Vendor/Vendor'

const VendorList = ({ vendors }) => {
  return(
    <ul>
      {vendors.map(vendor => {
        return <li key={vendor.id}><Vendor vendor={vendor}/></li>
      })}
    </ul>
  )
}

export default VendorList