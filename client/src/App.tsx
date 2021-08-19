import React, { ReactElement } from "react";
import { Link, Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import UserService from "./Services/UserService";
import AdminService from "./Services/AdminService";
import { AdminGuard } from "./Components/Guards/AdminGuard";
import { LoginGuard } from "./Components/Guards/LoginGuard";
import { Error } from "./Views/Error";
import { Login } from "./Views/Login";
import { Splash } from "./Views/Splash";
import { Dashboard } from "./Views/Dashboard";
import { Admin } from "./Views/Admin";

export function App(): ReactElement { 
  const userService = UserService.getInstance();
  const adminService = AdminService.getInstance();
  
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/dashboard">Protected Page</Link></li>
          { adminService.isAdmin && userService.isAuthenticated && <li><Link to="/admin">Admin Page</Link></li> }

        </ul>
        
        <Switch>
          <Route exact path="/">
            { userService.isAuthenticated ?
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