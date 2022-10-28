export class User {
  id!: number;
  isAdmin!: boolean;
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNo!: string;
  address!: string;
  state!: string;
  country!: string;
  password!: string;
  dateOfBirth!: string;
  gender!: string;
  
}

export interface LoginResponse {
  Message: string;
  userData: string;
}

export interface UserItems {
    message: string;
    userData: string;
    admin: boolean;
  }
