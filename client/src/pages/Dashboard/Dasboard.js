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
        this.setState({
           events: response.data
        })
      })
  }

  handleEventClick = (id) => {
    axios
      .get(`${url}events/${id}/vendors`)
      .then(response =>{
        console.log(response.data)
      })
  }

  render() {
    return(
      <div className="dashboard">
        <Sidebar events={this.state.events} handleClick={this.handleEventClick}/>
        <div className="dashboard-content">
          <div className="dashboard-content__image">
            <div className="dashboard-content__image--overlay">
              <h2 className="dashboard-content__image__heading">Party Agile</h2>
              <p className="dashboard-content__image__sub-heading">Allow us to keep your events organize</p>
            </div>
          </div>
          {/*<AddEventForm />*/}
          {/*<AddVendorForm/>*/}
        </div>
        {/*<TaskModal/>*/}
      </div>
    )
  }
}

export default Dashboard;