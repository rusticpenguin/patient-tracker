import React, { ReactElement } from "react";
import { Appointment } from "../Interfaces/UserInterface";
import AppointmentService from "../Services/AppointmentService";
import UserService from "../Services/UserService";

export function Dashboard(): ReactElement {
  const userService = UserService.getInstance();
  // const makeAppointment = (appointment: Appointment) => AppointmentService.getInstance().makeAppointment(appointment);
  const cancelAppointment = (MouseEventHandler: HTMLButtonElement) => {
    const id = MouseEventHandler.parentElement?.getAttribute('key') as string;
    AppointmentService.getInstance().cancelAppointment(id);
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {/* {userService.getUser().then(user => user.appointments.map((appointment: Appointment) => {
          return (
            <li key={appointment.uid}>{appointment.provider}, {appointment.appointmentTime}, <button onClick={() => cancelAppointment}>Cancel</button></li>
          );
        }))} */}
      </ul>
    </div>
  );
}