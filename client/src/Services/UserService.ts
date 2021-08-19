import { BehaviorSubject } from "rxjs";
import { FetchMethods, UserEndpoints } from "../Interfaces/Enums/apiEnums";
import { CacheEnums } from "../Interfaces/Enums/cacheEnums";
import { UserData } from "../Interfaces/UserInterface";
import CacheService from "./CacheService";

export default class UserService {
  static myInstance: UserService;
  cacheService: CacheService;
  isAuthenticated = new BehaviorSubject(false);

  constructor() {
    this.cacheService = CacheService.getInstance();
    this.cacheService.cache.subscribe((data) => {
      this.isAuthenticated.next(!!data.currentUser);
    });
  }
  
  static getInstance(): UserService {
    if (!UserService.myInstance) {
      UserService.myInstance = new UserService();
      return UserService.myInstance;
    } else {
      return UserService.myInstance;
    }
  }
  
  async authenticate(callback: () => void): Promise<void> {
    await this.getUser();
    callback();
  }

  async signout(callback: () => void): Promise<void> {
    await this.cacheService.clearCache();
    callback();
  }
  
  IsAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  async getUser(): Promise<UserData> {
    try {
      if (this.cacheService.getCache(CacheEnums.CURRENTUSER)) {
        return this.cacheService.getCache(CacheEnums.CURRENTUSER) as UserData;
      }

      const response = await fetch(process.env.PUBLIC_URL + UserEndpoints.GETUSER);
      const userData: UserData = await response.json();
      this.cacheService.setCurrentUser(userData);

      return this.cacheService.cache.value.currentUser as UserData;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async updateUser(data: UserData): Promise<UserData> {
    try {
      if (!this.isAuthenticated) {
        throw Error('User is not logged in!');
      }

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