import { CacheEnums } from "../Enums/cacheEnums";
import { CacheData, UserData } from "../Interfaces/UserInterface";

export default class Cache {
  cache: CacheData = {
    currentUser: null,
    viewableUsers: []
  };
  
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
  
  saveToLocalStorage(cacheName: CacheEnums, value: unknown): void {
    try {
      localStorage.setItem(cacheName, JSON.stringify(value));
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // restoreFromLocalStorage(cacheName: CacheEnums): unknown {
  //   try {
  //     const item = localStorage.getItem(cacheName) 
  //     if (item) {
  //       this.cache[cacheName] = localStorage.getItem(cacheName);
  //     }
  //     return this.cache[cacheName];
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
  
  clearLocalStorage(): void {
    localStorage.clear();
  }
}