import { CacheEnums } from "../Interfaces/Enums/cacheEnums";
import { CacheData, UserData } from "../Interfaces/UserInterface";

export default class CacheService {
  static myInstance: CacheService;
  cache: CacheData = {
    currentUser: null,
    viewableUsers: []
  };
  
  static getInstance(): CacheService {
    if (!CacheService.myInstance) {
      CacheService.myInstance = new CacheService();
      return CacheService.myInstance;
    } else {
      return CacheService.myInstance;
    }
  }
  
  doesExist(cacheName: string): boolean {
    return this.cache.hasOwnProperty(cacheName);
  }
  
  getCache(cacheName: CacheEnums): UserData|UserData[]|null {
    if (this.doesExist(cacheName)) {
      return this.cache[cacheName];
    }
    
    return null;
  }
  
  setCurrentUser(value: UserData): void {
    this.cache[CacheEnums.CURRENTUSER] = value;
  }

  setViewableUsers(value: UserData[]): void {
    this.cache[CacheEnums.VIEWABLEUSERS] = value;
  }
  
  clearCache(): void {
    this.cache = {
      currentUser: null,
      viewableUsers: []
    };
  }
}