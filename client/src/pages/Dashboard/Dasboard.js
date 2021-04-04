import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import Event from '../../components/Event/Event'

const Dashboard = () => {
  return(
    <div className="dashboard">
      <Sidebar />
      <Event />
    </div>
  )
}

export default Dashboard;