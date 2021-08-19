import { AdminEndpoints, FetchMethods, UserEndpoints } from "../Enums/apiEnums";
import { CacheEnums } from "../Enums/cacheEnums";
import { UserData } from "../Interfaces/UserInterface";
import Cache from "./Cache";

export default class UserService {
  static myInstance: UserService;
  cache: Cache;
  isAuthenticated = false;
  isAdmin = false;

  constructor() {
    this.cache = new Cache();
  }
  
  static getInstance(): UserService {
    if (!UserService.myInstance) {
      UserService.myInstance = new UserService();
      return UserService.myInstance;
    } else {
      return UserService.myInstance;
    }
  }
  
  init(): void {
    // this.cache.restoreFromLocalStorage(CacheEnums.CURRENTUSER);
    // this.cache.restoreFromLocalStorage(CacheEnums.VIEWABLEUSERS);
  }
  
  authenticate(cb: () => void): void {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  }
  signout(cb: () => void): void {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }

  async getUser(): Promise<UserData> {
    try {
      if (this.cache.getCache(CacheEnums.CURRENTUSER)) {
        return this.cache.getCache(CacheEnums.CURRENTUSER) as UserData;
      }

      const response = await fetch(process.env.PUBLIC_URL + UserEndpoints.GETUSER);
      const userData: UserData = await response.json();
      this.isAdmin = userData.roles.includes('admin');
      this.isAuthenticated = true;
      this.cache.setCurrentUser(userData);
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
      this.cache.setCurrentUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async deleteUser(userId: number): Promise<string> {
    try {
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