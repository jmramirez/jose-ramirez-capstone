import './Message.scss'
import { longAgo } from '../../utils/utils';

export const Message = ({ owner, content, created, name }) => {
  return(
    <li className={owner === 'yours'? "message message--yours": 'message'}>
      <p className="message__from">From: {name}</p>
      <p className="message__content">{content}</p>
      <p className="message__sent">Sent: {longAgo(new Date(created))}</p>
    </li>
  )
}