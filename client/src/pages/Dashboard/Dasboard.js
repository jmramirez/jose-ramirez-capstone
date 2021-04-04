import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/AddEventForm'

const Dashboard = () => {
  return(
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <AddEventForm />
      </div>
    </div>
  )
}

export default Dashboard;