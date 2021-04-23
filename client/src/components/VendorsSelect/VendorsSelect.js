import  {useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../config'

export const VendorsSelect = () => {
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    axios.get(`${url}vendor`)
      .then(response => {
        setVendors(response.data)
      })
  }, [])

  return(
    <select
      id="vendors"
      name="vendors"
      value={vendors.id}
    >
      <option value="" disabled defaultValue>Please Select Vendor</option>
      {vendors.map(vendor =>(
        <option value={vendor.id}>Name: {vendor.name}    Category: {vendor.type}</option>
      ))}
    </select>
  )
}