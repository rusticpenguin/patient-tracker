import { AdminEndpoints, FetchMethods } from "../Enums/apiEnums";
import { UserData } from "../Interfaces/UserInterface";

export default class AdminService {
  static myInstance: AdminService;
  isAdmin = false;
  
  static getInstance(): AdminService {
    if (!AdminService.myInstance) {
      AdminService.myInstance = new AdminService();
      return AdminService.myInstance;
    } else {
      return AdminService.myInstance;
    }
  }
 
  async getAllUsers(): Promise<UserData[]> {
    try {
      if (!this.isAdmin) {
        throw 'User is not an admin!';
      }
  
      const response = await fetch(process.env.PUBLIC_URL + AdminEndpoints.GETALLUSERS, {
        method: FetchMethods.GET,
      });
      const users: UserData[] = await response.json();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: number): Promise<string> {
    try {
      if (!this.isAdmin) {
        throw 'User is not an admin!';
      }

      await fetch(process.env.PUBLIC_URL + AdminEndpoints.DELETEUSER, {
        method: FetchMethods.POST,
        body: JSON.stringify({ userId: userId })
      });
      return 'User was successfully deleted!';
    } catch (error) {
      throw new Error(error);
    }
  }
}