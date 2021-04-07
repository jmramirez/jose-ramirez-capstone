import { Component } from 'react'
import axios from 'axios'
import './Dashboard.scss'
import  { url } from '../../config'
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
          return axios.get(`${url}events/${this.props.match.params.id}/vendors`)
        })
        .then(response =>{
          this.setState({
              vendors: response.data
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
          return axios.get(`${url}events/${this.props.match.params.id}/vendors`)
        })
        .then(response =>{
          this.setState({
            vendors: response.data
          })
        })
    }
  }



  render() {
    return(
      <div className="dashboard">
        <div className="dashboard-content">
          {(this.state.eventSelected) && <EventDetails eventItem={this.state.eventSelected} />}
          {this.state.eventSelected && (this.state.vendors.length === 0)?
            <>
              <p className="dashboard__no-vendors">There is not Vendors Assigned to this Event</p>
            </>
            :
            <>
              <VendorList vendors={this.state.vendors} />
            </>

            }
        </div>
      </div>
    )
  }
}

export default Dashboard;