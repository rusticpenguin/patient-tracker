import React, { ReactElement } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import AdminService from "../../Services/AdminService"
import UserService from "../../Services/UserService"


export function AdminGuard ({ children, ...rest }: RouteProps): ReactElement {
  return (
    <Route {...rest} render={({ location }) => {
      return AdminService.getInstance().IsAdmin() && UserService.getInstance().IsAuthenticated()
        ? children
        : <Redirect to={{
          pathname: '/error',
          state: { from: location }
        }} />
    }} />
  )
}