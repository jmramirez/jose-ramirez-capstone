import { Component } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import  { url } from '../../config'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/AddEventForm'
import AddVendorForm from '../../components/AddVendorForm/AddVendorForm'
import TaskModal from '../../components/TaskModal/TaskModal'

class Dashboard extends Component {
  state ={
    events: []
  }

  componentDidMount() {
    axios
      .get(`${url}events`)
      .then(response => {
        console.log(response.data)
        this.setState({
           events: response.data
        })
      })
  }

  render() {
    return(
      <div className="dashboard">
        <Sidebar events={this.state.events}/>
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