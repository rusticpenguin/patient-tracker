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
    })
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

  signout(callback: () => void): void {
    this.cacheService.clearCache();
    setTimeout(callback, 100)
  }
  
  IsAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  async getUser(): Promise<UserData> {
    try {
      if (this.cacheService.getCache(CacheEnums.CURRENTUSER)) {
        return this.cacheService.getCache(CacheEnums.CURRENTUSER) as UserData;
      }

      // const response = await fetch(process.env.PUBLIC_URL + UserEndpoints.GETUSER);
      // const userData: UserData = await response.json();
      // this.cacheService.setCurrentUser(userData);
      this.cacheService.setCurrentUser({
        roles: ['admin'],
        appointments: [],
        photoUrl: 'x',
        lastLogin: 999,
        accountCreated: 80,
        uid: '99',
        username: 'addafadf',
        dateOfBirth: 90,
        phoneNumber: 'dad',
        address: 'aaa',
        email: 'daf'
      });
      return this.cacheService.cache.value.currentUser as UserData;
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