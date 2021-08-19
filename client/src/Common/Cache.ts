export default class Cache {
  cache: Record<string, unknown> = {};
  
  doesExist(cacheName: string): boolean {
    return this.cache.hasOwnProperty(cacheName);
  }
  
  getCache(cacheName: string): unknown {
    if (this.doesExist(cacheName)) {
      return this.cache[cacheName];
    }
  }
  
  public setCache(cacheName: string, value: unknown): void {
    this.cache[cacheName] = value;
  }
  
  clearCache(): void {
    this.cache = {};
  }
  
  saveToLocalStorage(cacheName: string, value: unknown): void {
    try {
      localStorage.setItem(cacheName, JSON.stringify(value));
    } catch (error) {
      throw new Error(error);
    }
  }
  
  restoreFromLocalStorage(cacheName: string): unknown {
    try {
      this.cache[cacheName] = localStorage.getItem(cacheName);
      return this.cache[cacheName];
    } catch (error) {
      throw new Error(error);
    }
  }
  
  clearLocalStorage() {
    localStorage.clear;
  }
}