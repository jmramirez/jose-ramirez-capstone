import './Message.scss'

export const Message = ({ owner }) => {
  return(
    <li className={owner === 'yours'? "message message--yours": 'message'}>
      <p className="message__from">From: Vendor</p>
      <p className="message__content">Please can you send me the last invoice?</p>
      <p className="message__sent">Sent: 1min Ago</p>
    </li>
  )
}