import './MessageForm.scss'
import {MessagesList} from '../MessagesList/MessagesList';
import {Link, useHistory} from 'react-router-dom';
import {Icon} from '../Icon/Icon';


export const MessageForm = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return(
    <main className="messagesForm">
      <div className="messagesForm__header">
        <h2> - Messages</h2>
        <div className="messagesForm__header-actions">
          <button type="button" onClick={goBack} className="messagesForm__header-actions__link">
            <Icon name="close" /><p className="messagesForm__header-actions__link-text">Close Chat</p>
          </button>
        </div>
      </div>
      <div className="messagesForm__content">
        <MessagesList/>
      </div>
      <form className="messagesForm__form">
        <div className="messagesForm__form__row messagesForm__form__row--text">
          <label className="messagesForm__form__row-controls__label">Message:</label>
          <textarea className="messagesForm__form__row-controls__inputText" />
          <button className="messagesForm__form__row-controls__button">Send</button>
        </div>
      </form>
    </main>
  )
}