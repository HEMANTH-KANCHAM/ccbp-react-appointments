import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, makeStar} = props
  const {id, title, date, isStarred} = appointmentItem

  const onStar = () => {
    makeStar(id)
  }

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button
          data-testid="star"
          type="button"
          className="star-button"
          onClick={onStar}
        >
          <img src={starImageUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
