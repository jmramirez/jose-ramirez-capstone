import './Vendor.scss'

const Vendor = ({ vendor }) => {
  return(
    <main className="vendor-item">
      <h2 className="vendor-item__header">
        { vendor.name }
      </h2>
    </main>
  )
}

export default  Vendor;