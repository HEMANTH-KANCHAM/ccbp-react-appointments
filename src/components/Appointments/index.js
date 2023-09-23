import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', starred: false}

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  makeStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  starredAppointments = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  render() {
    const {appointmentsList, date, title, starred} = this.state

    const starredAppointmentsList = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )

    const FilterdAppointmentsList = starred
      ? starredAppointmentsList
      : appointmentsList

    return (
      <div className="app-container">
        <div className="content-container">
          <div className="header">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="form-heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="title-input"
                id="title"
                type="text"
                placeholder="Title"
                onChange={this.titleChange}
                value={title}
              />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                className="date-input"
                id="date"
                type="date"
                onChange={this.dateChange}
                value={date}
              />
              <button className="submit-button" type="submit">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="footer">
            <div className="footer-heading-container">
              <h1 className="footer-heading">Appointments</h1>
              <button
                className="starred-button"
                type="button"
                onClick={this.starredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {FilterdAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentItem={eachAppointment}
                  key={eachAppointment.id}
                  makeStar={this.makeStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
