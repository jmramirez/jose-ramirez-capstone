import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/AddEventForm'

const Dashboard = () => {
  return(
    <div className="dashboard">
      <Sidebar />
      <AddEventForm />
    </div>
  )
}

export default Dashboard;