import React, { ReactElement } from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router-dom";
import UserService from "../Services/UserService";

type LocationState = {
  from: Location;
};

const Login = (props: RouteComponentProps): ReactElement => {
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = React.useState(false)
  
  const { state } = useLocation<LocationState>();

  const login = () => UserService.getInstance().authenticate(() => {
    setRedirectToReferrer(true);
  })

  if (redirectToReferrer === true) {
    props.history.push(state?.from || '/');
  }

  return (
  <div>
    <h1>Login</h1>
    <button onClick={login}>Log in</button>
  </div>
  );
}

export default withRouter(Login);