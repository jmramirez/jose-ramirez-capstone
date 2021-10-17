import './EventItem.scss'
import {Link} from 'react-router-dom'
import {Icon} from '../Icon/Icon';

export const EventItem = ({ event, user }) => (
  <div className="eventItem">
    {user && user.role ==='Planner' && <Link to={`/events/${event.id}`} className="eventItem__link"><p className="eventItem__link__text">{event.title}</p> <Icon name="trending_flat" /></Link>}
    {user && user.role ==='Vendor' && (
      <div className="eventItem__header">
        <p className="eventItem__header__text">{event.title}</p>
        <div className="eventItem__header__actions">
          <Link to={`/vendor/${user.vendor.id}/event/${event.id}`} className="eventItem__header__actions__link">
            <Icon name="paid"/><p className="eventItem__header__actions__link-text">Register Payment</p>
          </Link>
          <Link to={`/event/${event.id}/message/${user.vendor.id}`} className="eventItem__header__actions__link">
            <Icon name="chat"/><p className="eventItem__header__actions__link-text">Chat with Planner</p>
          </Link>
        </div>
      </div>
    )}
    <div className="eventItem__content">
      <p className="eventItem__content__text--description"><span className="eventItem__content__label">Organized by: </span>{event.creatorName}</p>
      <p className="eventItem__content__text--date"><span className="eventItem__content__label">Event Date: </span>{new Date(event.eventDate).toLocaleDateString()}</p>
      <div className="eventItem__content--vendor">
        <p className="eventItem__content__text eventItem__content__text--budget"><span className="eventItem__content__label">Budget: </span>{event.budget.amount}{event.budget.currency}</p>
        {event.depositPaid && <p className="eventItem__content__text eventItem__content__text--deposit"><span className="eventItem__content__label">Deposit Paid: </span>{event.depositPaid.amount}{event.depositPaid.currency}</p>}
      </div>
      <p className="eventItem__content__text">
        <span className="eventItem__content__label">Guests Aprox*: </span>{event.guests} {event.guests > 1 ? 'people' :'person'}
      </p>
    </div>
  </div>
)