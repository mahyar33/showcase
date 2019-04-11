import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Security from '../../utils/Security'


const PublicRoute = ({component: Component, ...rest}) => {
	return <Route {...rest} render={props => (
		Security.isAuthenticated() ? (
			<Redirect to={{
				pathname: '/dashboard',
				state: {from: props.location}
			}}/>

		): (<Component {...props}/>)
		)}/>
}

export default PublicRoute