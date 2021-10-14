import './MessagesList.scss'
import {Message} from '../Message/Message';

export const MessagesList = () => {
  return(
    <ul className="message-list">
      <Message owner='yours' />
      <Message />
      <Message  owner='yours' />
    </ul>
  )
}