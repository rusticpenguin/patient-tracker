interface CoreUser {
  username: string,
  dateOfBirth: number,
  phoneNumber: string,
  email: string,
  address: string,
  photoUrl: string,
}

export interface UserData extends CoreUser {
  roles: string[],
  appointments: Appointment[],
  lastLogin: number,
  accountCreated: number
}

export interface UserRegistationData extends CoreUser {
  appointment: Appointment
}

export interface Appointment {
  provider: string,
  dateCreate?: number,
  appointmentTime: number,
  isCanceled?: boolean
}

export interface CacheData {
  currentUser: UserData|null,
  viewableUsers: UserData[]
}