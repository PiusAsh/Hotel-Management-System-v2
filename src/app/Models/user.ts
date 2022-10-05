export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  address: string;
  state: string;
  country: string;
  password: string;
  dateOfBirth: string;
  gender: string;
}

export interface LoginResponse {
    Message :string;
    userData: string
  }
