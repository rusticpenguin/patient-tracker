export enum UserEndpoints {
  GETUSER = '/my-account',
  UPDATEUSER = '/my-account',
}

export enum AppointmentEndpoints {
  MAKEAPPOINTMENT = '/make-appointment',
  CANCELAPPOINTMENT = '/cancel-appointment',
}

export enum AdminEndpoints {
  GETALLUSERS = '/users',
  DELETEUSER = '/delete-user',
}

export enum FetchMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}