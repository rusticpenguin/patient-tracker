import React, { ReactElement } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import UserService from "../../Services/UserService";

const Logout = (props: RouteComponentProps): ReactElement => {
  const logout = () => UserService.getInstance().signout(() => {
    props.history.push('/');
  })

  return (
    <button onClick={logout}>Log out</button>
  );
}

export default withRouter(Logout);