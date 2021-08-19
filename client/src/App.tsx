import React, { ReactElement } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import UserService from "./Services/UserService";
import { AdminGuard } from "./Components/Guards/AdminGuard";
import { LoginGuard } from "./Components/Guards/LoginGuard";
import { Error } from "./Views/Error";
import Login from "./Views/Login";
import { Splash } from "./Views/Splash";
import { Dashboard } from "./Views/Dashboard";
import { Admin } from "./Views/Admin";
import { Nav } from "./Components/Common/Nav/Nav";

export function App(): ReactElement { 
  const userService = UserService.getInstance();
  
  return (
    <Router>
      <div>
        <Nav />
        
        <Switch>
          <Route exact path="/">
            { userService.IsAuthenticated() ?
              <Redirect to="/dashboard" /> : 
              <Splash />
            }
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <LoginGuard path='/dashboard'>
            <Dashboard />
          </LoginGuard>
          
          <AdminGuard path='/admin'>
            <Admin />
          </AdminGuard>
          
          <Route path='/error'>
            <Error />
          </Route>
          
          <Route path="*">
            <Redirect to='/error'/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}