import { Component} from 'react'
import { Route, Redirect} from 'react-router-dom'
import auth from '../../utils/auth-helper'

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated()? (
        Component ? <Component {...props} /> : rest.render(props)
    )
      :
    (
      <Redirect to={{
       pathname: '/login',
       state: {from: props.location}
      }}/>
    )
    )}
  />
)

export default PrivateRoute
