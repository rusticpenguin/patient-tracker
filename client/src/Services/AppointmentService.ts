import { BehaviorSubject } from "rxjs";
import { AppointmentEndpoints, FetchMethods } from "../Interfaces/Enums/apiEnums";
import { Appointment } from "../Interfaces/UserInterface";
import CacheService from "./CacheService";

export default class AppointmentService {
  static myInstance: AppointmentService;
  cacheService: CacheService;
  isAuthenticated = new BehaviorSubject(false);

  constructor() {
    this.cacheService = CacheService.getInstance();
    this.cacheService.cache.subscribe((data) => {
      this.isAuthenticated.next(!!data.currentUser);
    })
  }
  
  static getInstance(): AppointmentService {
    if (!AppointmentService.myInstance) {
      AppointmentService.myInstance = new AppointmentService();
      return AppointmentService.myInstance;
    } else {
      return AppointmentService.myInstance;
    }
  }

  async makeAppointment(appointment: Appointment): Promise<string> {
    try {
      if (!this.isAuthenticated) {
        throw Error('User is not logged in!');
      }

      const response = await fetch(process.env.PUBLIC_URL + AppointmentEndpoints.MAKEAPPOINTMENT, {
        method: FetchMethods.POST,
        body: JSON.stringify(appointment)
      });
      const responseText: string = await response.json();
      return responseText;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async cancelAppointment(appointmentId: string): Promise<string> {
    try {
      if (!this.isAuthenticated) {
        throw Error('User is not logged in!');
      }

      const response = await fetch(process.env.PUBLIC_URL + AppointmentEndpoints.CANCELAPPOINTMENT, {
        method: FetchMethods.PUT,
        body: JSON.stringify(appointmentId)
      });
      const responseText: string = await response.json();
      return responseText;
    } catch (error) {
      throw new Error(error);
    }
  }
}