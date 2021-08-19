import React, { ReactElement } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import UserService from "../Common/UserService"


export function AdminGuard ({ children, ...rest }: RouteProps): ReactElement {
  return (
    <Route {...rest} render={({ location }) => {
      return UserService.getInstance().isAdmin && UserService.getInstance().isAuthenticated
        ? children
        : <Redirect to={{
          pathname: '/error',
          state: { from: location }
        }} />
    }} />
  )
}