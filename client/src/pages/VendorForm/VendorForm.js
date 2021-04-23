import {VendorsForm} from '../../components/AddVendorForm/VendorsForm'

const VendorForm = ({ match, history, action, handleUpdate, user }) =>{
  return(
    <div className="dashboard">
      <div className="dashboard-content">
        <VendorsForm children={match} history={history} action={action} handleUpdate={handleUpdate} user={user}/>
      </div>
    </div>
  )
}

export default VendorForm;