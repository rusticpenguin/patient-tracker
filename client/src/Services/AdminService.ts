import { AdminEndpoints, FetchMethods } from "../Interfaces/Enums/apiEnums";
import { CacheEnums } from "../Interfaces/Enums/cacheEnums";
import { UserData } from "../Interfaces/UserInterface";
import CacheService from "./CacheService";

export default class AdminService {
  static myInstance: AdminService;
  cacheService: CacheService;
  isAdmin = false;

  constructor() {
    this.cacheService = CacheService.getInstance();
  }

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
      
      if (this.cacheService.getCache(CacheEnums.VIEWABLEUSERS)) {
        return this.cacheService.getCache(CacheEnums.VIEWABLEUSERS) as UserData[];
      }
  
      const response = await fetch(process.env.PUBLIC_URL + AdminEndpoints.GETALLUSERS, {
        method: FetchMethods.GET,
      });
      const users: UserData[] = await response.json();
      this.cacheService.setViewableUsers(users);
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: string): Promise<string> {
    try {
      if (!this.isAdmin) {
        throw 'User is not an admin!';
      }

      await fetch(process.env.PUBLIC_URL + AdminEndpoints.DELETEUSER, {
        method: FetchMethods.POST,
        body: JSON.stringify({ userId: userId })
      });
      
      const usersArray = this.cacheService.getCache(CacheEnums.VIEWABLEUSERS) as UserData[];
      
      const newUsers = usersArray.filter((user) => {
        user.uid === userId;
      });
      this.cacheService.setViewableUsers(newUsers);
      return 'User was successfully deleted!';
    } catch (error) {
      throw new Error(error);
    }
  }
}