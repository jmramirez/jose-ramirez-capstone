import { Component } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import  { url } from '../../config'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/AddEventForm'
import AddVendorForm from '../../components/AddVendorForm/AddVendorForm'
import TaskModal from '../../components/TaskModal/TaskModal'

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          {/*<AddEventForm />*/}
          {/*<AddVendorForm/>*/}
        </div>
        {/*<TaskModal/>*/}
      </div>
    )
  }
}

export default Dashboard;