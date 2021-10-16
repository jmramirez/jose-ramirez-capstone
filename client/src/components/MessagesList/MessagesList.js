import './MessagesList.scss'
import {Message} from '../Message/Message';
import {useEffect, useRef} from 'react';

export const MessagesList = ({ messages, user }) => {
  const listEndRef = useRef(null)

  const scrollToEnd = () => {
    listEndRef.current.scrollIntoView({ behavior: "smooth"})
  }

  useEffect(scrollToEnd, [messages])

  return(
    <ul className="message-list">
      <div className="message-list__container">
        <div ref={listEndRef}/>
        {messages.map(message => {
          return <Message
            key={message.id}
            owner={user && user.name === message.senderName ? 'yours' : ''}
            content={message.content}
            created={message.created}
            name={message.senderName}
          />
        })}
      </div>
    </ul>
  )
}