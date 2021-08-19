import { FetchMethods, UserEndpoints } from "../Enums/apiEnums";
import { CacheEnums } from "../Enums/cacheEnums";
import { UserData } from "../Interfaces/UserInterface";
import Cache from "./Cache";

export default class ApiService {
  static singleton: ApiService|null = null
  cache: Cache|null = null;
  
  constructor() {
    if (!ApiService.singleton) {
      ApiService.singleton = this;
      
      this.cache = new Cache();
      this.cache.restoreFromLocalStorage(CacheEnums.CURRENTUSER);
      this.cache.restoreFromLocalStorage(CacheEnums.VIEWABLEUSERS);
    }
  }
  
  async getUser(): Promise<UserData> {
    try {
      const userData = await fetch(process.env.PUBLIC_URL + UserEndpoints.GETUSER);
      return await userData.json() as UserData;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async updateUser(data: UserData): Promise<UserData> {
    try {
      const userData = await fetch(process.env.PUBLIC_URL + UserEndpoints.UPDATEUSER, {
        method: FetchMethods.PUT,
        body: JSON.stringify(data)
      });
      return await userData.json() as UserData;
    } catch (error) {
      throw new Error(error);
    }
  }
}