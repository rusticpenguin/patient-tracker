import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../../Services/AdminService";
import UserService from "../../../Services/UserService";
import Logout from "../Logout";

export function Nav(): ReactElement {
  const userService = UserService.getInstance();
  const adminService = AdminService.getInstance();
  
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  
  useEffect(() => {
    const userSubscription = userService.isAuthenticated.subscribe(setAuthenticated);
    const adminSubscription = adminService.isAdmin.subscribe(setAdmin);
    
    return () => {
      userSubscription.unsubscribe();
      adminSubscription.unsubscribe();
    }
  }, [userService, adminService]);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home Page</Link></li>
        <li><Link to="/dashboard">Dashboard Page</Link></li>
        { admin && authenticated && 
            <li><Link to="/admin">Admin Page</Link></li> }
            
        { authenticated && <li><Logout /></li>}
      </ul>
    </nav>
  )
}