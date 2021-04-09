import VendorsForm from '../../components/AddVendorForm/VendorsForm'

const VendorForm = ({ match, history, action, handleUpdate }) =>{
  return(
    <div className="dashboard">
      <div className="dashboard-content">
        <VendorsForm children={match} history={history} action={action} handleUpdate={handleUpdate}/>
      </div>
    </div>
  )
}

export default VendorForm;