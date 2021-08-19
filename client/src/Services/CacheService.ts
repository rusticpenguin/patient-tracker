import { BehaviorSubject } from "rxjs";
import { CacheEnums } from "../Interfaces/Enums/cacheEnums";
import { CacheData, UserData } from "../Interfaces/UserInterface";

export default class CacheService {
  static myInstance: CacheService;
  cache: BehaviorSubject<CacheData> = new BehaviorSubject<CacheData>({currentUser: null, viewableUsers: []});
  
  static getInstance(): CacheService {
    if (!CacheService.myInstance) {
      CacheService.myInstance = new CacheService();
      return CacheService.myInstance;
    } else {
      return CacheService.myInstance;
    }
  }
  
  getCache(cacheName: CacheEnums): UserData|UserData[]|null {
      return this.cache.value[cacheName];
  }
  
  setCurrentUser(value: UserData): void {
    this.cache.next({ ...this.cache.value, currentUser: value });
  }

  setViewableUsers(value: UserData[]): void {
    this.cache.next({ ...this.cache.value, viewableUsers: value });
  }
  
  clearCache(): void {
    this.cache.next({ ...this.cache.value, currentUser: null, viewableUsers: []});
  }
}