import React, { ReactElement } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import UserService from "../../Services/UserService"


export function LoginGuard ({ children, ...rest }: RouteProps): ReactElement {
  return (
    <Route {...rest} render={({ location }) => {
      return UserService.getInstance().IsAuthenticated()
        ? children
        : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />
    }} />
  )
}