import { Component } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.scss'
import  { url } from '../../config'
import Event from '../../components/Event/Event'
import AddEventForm from '../../components/AddEventForm/EventsForm'
import AddVendorForm from '../../components/AddVendorForm/AddVendorForm'
import TaskModal from '../../components/TaskModal/TaskModal'
import Vendor from '../../components/Vendor/Vendor'
import VendorList from '../../components/VendorsList/VendorsList'
import EventDetails from '../../components/EventDetails/EventDetails'

class Dashboard extends Component {
  state ={
    eventSelected: null,
    vendors: [],
  }

  componentDidMount() {
    if(this.props.match.params.id){
      axios
        .get(`${url}events/${this.props.match.params.id}`)
        .then(response =>{
          this.setState({
            eventSelected: response.data
          })
        })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.match.params;


    if(prevProps.match.params.id !== id){
      axios
        .get(`${url}events/${id}`)
        .then(response =>{
          this.setState({
            eventSelected: response.data
          })
        })
    }
  }



  render() {
    return(
      <div className="dashboard">
        <div className="dashboard-content">
          {/*{(this.props.match.params.action && this.props.match.params.action === "add" && <AddEventForm  action="Add New"/>)}*/}
          {(this.state.eventSelected) && <EventDetails eventItem={this.state.eventSelected} />}
          {(this.state.vendors.length === 0)?
            <>

            </>
            :
            <>
              <EventDetails eventItem={this.state.eventSelected}/>
              <VendorList vendors={this.state.vendors} />
            </>

            }
        </div>
      </div>
    )
  }
}

export default Dashboard;