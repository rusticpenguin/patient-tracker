import { FetchMethods, UserEndpoints } from "../Enums/apiEnums";
import { CacheEnums } from "../Enums/cacheEnums";
import { UserData } from "../Interfaces/UserInterface";
import AdminService from "./AdminService";
import CacheService from "./CacheService";

export default class UserService {
  static myInstance: UserService;
  cacheService: CacheService;
  isAuthenticated = false;

  constructor() {
    this.cacheService = CacheService.getInstance();
  }
  
  static getInstance(): UserService {
    if (!UserService.myInstance) {
      UserService.myInstance = new UserService();
      return UserService.myInstance;
    } else {
      return UserService.myInstance;
    }
  }
  
  authenticate(callback: () => void): void {
    this.isAuthenticated = true
    setTimeout(callback, 100)
  }

  signout(callback: () => void): void {
    this.isAuthenticated = false
    setTimeout(callback, 100)
  }

  async getUser(): Promise<UserData> {
    try {
      if (this.cacheService.getCache(CacheEnums.CURRENTUSER)) {
        return this.cacheService.getCache(CacheEnums.CURRENTUSER) as UserData;
      }

      const response = await fetch(process.env.PUBLIC_URL + UserEndpoints.GETUSER);
      const userData: UserData = await response.json();
      AdminService.getInstance().isAdmin = userData.roles.includes('admin');
      this.isAuthenticated = true;
      this.cacheService.setCurrentUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async updateUser(data: UserData): Promise<UserData> {
    try {
      const response = await fetch(process.env.PUBLIC_URL + UserEndpoints.UPDATEUSER, {
        method: FetchMethods.PUT,
        body: JSON.stringify(data)
      });
      const userData: UserData = await response.json();
      this.cacheService.setCurrentUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }
}