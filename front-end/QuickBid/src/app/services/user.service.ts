import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL="http://localhost:1111/user";

  constructor(private http:HttpClient) { }

  saveUser(user:User)
  {
    return this.http.post<any>(`${this.BASE_URL}`,user);
  }

  getUser(userName:string)
  {
    return this.http.get<User>(`${this.BASE_URL}/${userName}`);
  }

  resetPw(userName:string, newpass:string)
  {
    return this.http.put<any>(`${this.BASE_URL}/${userName}/${newpass}`,null);
  }

  getAllUsers()
  {
    return this.http.get<User[]>(`${this.BASE_URL}`);
  }

  updateUser(user:User)
  {
    return this.http.put<any>(`${this.BASE_URL}`,user);
  }

  checkLogin(userName:string, password:string)
  {
    return this.http.get<User>(`${this.BASE_URL}/${userName}/${password}`);
  }

  deleteUser(userName:string)
  {
    return this.http.delete(`${this.BASE_URL}/${userName}`);
  }
}