import React, { ReactElement } from "react";
import { Redirect, useLocation } from "react-router-dom";
import UserService from "../Services/UserService";

type LocationState = {
  from: Location;
};

export const Login = (): ReactElement => {
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = React.useState(false)
  
  const { state } = useLocation<LocationState>();

  const login = () => UserService.getInstance().authenticate(() => {
    setRedirectToReferrer(true)
  })

  if (redirectToReferrer === true) {
    return <Redirect to={ state?.from || '/' } />
  }

  return (
  <div>
    <h1>Login</h1>
    <button onClick={login}>Log in</button>
  </div>
  );
}