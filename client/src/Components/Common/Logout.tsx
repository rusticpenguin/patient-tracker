import React, { ReactElement } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import UserService from "../../Services/UserService";

const Logout = (props: RouteComponentProps): ReactElement => {
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = React.useState(false)
  
  const logout = () => UserService.getInstance().signout(() => {
    setRedirectToReferrer(true);
    console.log(UserService.getInstance().IsAuthenticated());
  })

  if (redirectToReferrer === true) {
    props.history.push('/');
    setRedirectToReferrer(false);
  }

  return (
    <button onClick={logout}>Log out</button>
  );
}

export default withRouter(Logout);