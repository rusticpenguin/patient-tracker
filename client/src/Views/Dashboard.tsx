import React, { ReactElement, useEffect, useState } from "react";
import { Appointment } from "../Interfaces/UserInterface";
import AppointmentService from "../Services/AppointmentService";
import UserService from "../Services/UserService";

export function Dashboard(): ReactElement {
  const [userAppointments, setUserAppointments] = useState<Appointment[]>();
  const userService = UserService.getInstance();
  
  useEffect(() => {
    getUser();
  });
  
  const makeAppointment = async (appointment: Appointment) => {
    await AppointmentService.getInstance().makeAppointment(appointment);
    if (userAppointments) {
      setUserAppointments([ ...userAppointments, appointment ]);
    }
  };

  const cancelAppointment = async (id: string) => {
    await AppointmentService.getInstance().cancelAppointment(id);
    if (userAppointments) {
      setUserAppointments(userAppointments.filter(appointment => appointment.uid !== id));
    }
  };
  
  const getUser = async () => {
    if (!userAppointments) {
      const userData = await userService.getUser();
      setUserAppointments(userData.appointments);
    }
  }
  
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => { makeAppointment(
        {provider: 'dog', isCanceled: false, dateCreate: 90934134, appointmentTime: 310413, uid: 'ad333'},
      )}}>Make Appointment</button>
      {
        userAppointments && userAppointments.length ?        
        (<ul>
          { userAppointments.map((appointment: Appointment) => 
            (<li key={appointment.uid}>
              {appointment.provider}, {appointment.appointmentTime}, 
              <button onClick={() => {cancelAppointment(appointment.uid)}}>Cancel</button>
            </li>))
          }
        </ul>) :
        <p>You have no appointments...</p>
      }
    </div>
  );
}