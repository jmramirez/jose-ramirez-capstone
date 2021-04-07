import { Component } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import  { url } from '../../config'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/AddEventForm'
import AddVendorForm from '../../components/AddVendorForm/AddVendorForm'
import TaskModal from '../../components/TaskModal/TaskModal'
import Vendor from '../../components/Vendor/Vendor'
import VendorList from '../../components/VendorsList/VendorsList'

class Dashboard extends Component {
  state ={
    events: [],
    vendors: []
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
        this.setState({
          vendors: response.data
        })
      })
  }

  render() {
    return(
      <div className="dashboard">
        <Sidebar events={this.state.events} handleClick={this.handleEventClick}/>
        <div className="dashboard-content">
          {(this.state.vendors.length === 0)?
            <>
              <AddEventForm />)
              {/*<AddVendorForm/>*/}
            </>
            :<VendorList vendors={this.state.vendors}/>

            }
        </div>
        {/*<TaskModal/>*/}
      </div>
    )
  }
}

export default Dashboard;