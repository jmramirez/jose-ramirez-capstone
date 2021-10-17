import './MessageForm.scss'
import {MessagesList} from '../MessagesList/MessagesList';
import {useHistory} from 'react-router-dom';
import {Icon} from '../Icon/Icon';
import {useEffect, useState} from 'react';
import axios from 'axios'
import {url} from '../../config';
import {useForm} from 'react-hook-form';
import { HubConnectionBuilder, HubConnectionState, HubConnection } from '@aspnet/signalr';


export const MessageForm = ({ authenticated, match, user }) => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const { register, handleSubmit, formState:{ errors }, reset } = useForm()

  const getMessages = (vendorId, eventId, auth) => {
    axios.get(`${url}messages/${vendorId}/${eventId}`,{
      headers: {
        'Authorization' : `Bearer ${auth}`
      }
    })
      .then(response => {
        setMessages(response.data)
        setLoading(false)
      })
  }

  const setupSignalRConnection = async (vendorId, eventId) => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44326/messageshub')
      .withAutomaticReconnect()
      .build()

    connection.on('Message', (message) => {
      console.log('Message', message)
    })

    connection.on('ReceiveMessage', (message) => {
      console.log('ReceiveMessage', message);
      getMessages(message.vendorId, message.eventId, authenticated)
    });

    try {
      await connection.start()
    } catch (err) {
      console.log(err)
    }

    if(connection.state === HubConnectionState.Connected){
      connection
        .invoke('SubscribeEvent', eventId, vendorId)
        .catch((err)=>{
          return console.error(err.toString());
        });
    }

    return connection
  }

  const cleanUpSignalRConnection = async(vendorId, eventId, connection) => {
    if(connection.state === HubConnectionState.Connected){
      try {
        await connection.invoke('UnsubscribeEvent', eventId, vendorId)
      } catch (err) {
        return console.error(err.toString())
      }
      connection.off("Message")
      connection.off("ReceiveMessage")
      connection.stop()
    } else {
      connection.off("Message")
      connection.off("ReceiveMessage")
      connection.stop()
    }
  }

  useEffect(() => {
    let connection = HubConnection
    if(match.params.eventId && match.params.vendorId){
      getMessages(match.params.vendorId,match.params.eventId, authenticated)
      setupSignalRConnection(match.params.vendorId,match.params.eventId).then(con =>{
        connection = con
      })
    }
    return function cleanUp() {
      if(match.params.eventId && match.params.vendorId){
        const vendorId = match.params.vendorId
        const eventId = match.params.eventId
        cleanUpSignalRConnection(vendorId, eventId, connection)
      }
    }
  }, [authenticated, match.params.vendorId,match.params.eventId])

  const goBack = () => {
    history.goBack()
  }

  const onSubmit = (data) => {
    axios.post(`${url}messages/`,{
      content: data.message,
      created: new Date(),
      eventId: match.params.eventId,
      sender: user.name,
      vendorId: match.params.vendorId
    }, {
      headers: {
        'Authorization' : `Bearer ${authenticated}`
      }
    })
      .then(response => {
        getMessages(match.params.vendorId,match.params.eventId, authenticated)
        reset({ message: ""})
      })
  }



  return(
    loading ?
      <p>Loading...</p>
      :
    <main className="messagesForm">
      <div className="messagesForm__header">
        <h2>Conversations with {user.role === 'Planner'? 'Vendor' : 'Planner'}</h2>
        <div className="messagesForm__header-actions">
          <button type="button" onClick={goBack} className="messagesForm__header-actions__link">
            <Icon name="close" /><p className="messagesForm__header-actions__link-text">Close Chat</p>
          </button>
        </div>
      </div>
      <div className="messagesForm__content">
        {messages && user && <MessagesList messages={messages} user={user}/>}
      </div>
      <form className="messagesForm__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="messagesForm__form__row messagesForm__form__row--text">
          <label className="messagesForm__form__row-controls__label">Message:</label>
          <div className="messagesForm__form__row-controls__input">
            <textarea className="messagesForm__form__row-controls__input-text" {...register("message",{required: true})} autoComplete="off"/>
            {errors.message && (<p className="messagesForm__form__row-controls__input-error">You must insert a message!</p>)}
          </div>
          <button className="messagesForm__form__row-controls__button">Send</button>
        </div>
      </form>
    </main>
  )
}