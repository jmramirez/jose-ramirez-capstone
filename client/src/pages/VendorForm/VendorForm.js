import VendorsForm from '../../components/AddVendorForm/VendorsForm'

const VendorForm = ({ match, history }) =>{
  return(
    <div className="dashboard">
      <div className="dashboard-content">
        <VendorsForm children={match} history={history}/>
      </div>
    </div>
  )
}

export default VendorForm;