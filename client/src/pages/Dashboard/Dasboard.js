import { Component } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import  { url } from '../../config'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/EventForm'
import AddVendorForm from '../../components/AddVendorForm/AddVendorForm'
import TaskModal from '../../components/TaskModal/TaskModal'
import Vendor from '../../components/Vendor/Vendor'
import VendorList from '../../components/VendorsList/VendorsList'
import EventDetails from '../../components/EventDetails/EventDetails'

class Dashboard extends Component {
  state ={
    events: [],
    eventSelected: {},
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
          vendors: response.data,
        })
        return axios.get(`${url}events/${id}`)
      })
      .then(response => {
        this.setState({
          eventSelected: response.data
        })
      })
  }

  render() {
    console.log(this.props.match.params.action)
    return(
      <div className="dashboard">
        <Sidebar events={this.state.events} handleClick={this.handleEventClick}/>
        <div className="dashboard-content">
          {(this.props.match.params.action && this.props.match.params.action === "add" && <AddEventForm  action="Add New"/>)}
          {(this.state.vendors.length === 0)?
            <>
              {/*<AddVendorForm/>*/}
            </>
            :
            <>
              <EventDetails eventItem={this.state.eventSelected}/>
              <VendorList vendors={this.state.vendors} />
            </>

            }
        </div>
        {/*<TaskModal/>*/}
      </div>
    )
  }
}

export default Dashboard;