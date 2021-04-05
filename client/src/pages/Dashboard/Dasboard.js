import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/AddEventForm'
import AddVendorForm from '../../components/AddVendorForm/AddVendorForm'
import TaskModal from '../../components/TaskModal/TaskModal'

const Dashboard = () => {
  return(
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        {/*<AddEventForm />*/}
        <AddVendorForm/>
      </div>
      {/*<TaskModal/>*/}
    </div>
  )
}

export default Dashboard;