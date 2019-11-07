import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/User.model';
import { UserData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private usrSrv:UserService, private routing:Router) { }

  ngOnInit() {
  }

  /* SAVE A USER */
  saveUser(user:User) 
  {
    this.usrSrv.saveUser(user).subscribe(
      data=> console.log(data),
      error=>console.log(error)
    );
  }

  /* LOGIN VERIFYICATION FOR USER AND ADMIN */
  user=new UserData();
  chkLogin(userName:string,password:string, userType:string)
  {
    if(userType=="user") {
      this.usrSrv.checkLogin(userName,password).subscribe(
        async data=> {
          this.user= data
          if(this.user!=null) {
          // if(this.user.userName==this.userName&&this.user.password==this.password) { 
            localStorage.setItem('userName', userName);
            localStorage.setItem('pass', 'true');
            this.routing.navigateByUrl('/home');
            // alert("Login successful");
           }
          else alert("User Login Failed");
        },
        error=> console.log(error)
      );
    } else if(userType=="admin") {
      if(userName=="admin"&&password=="admin") {
        localStorage.setItem('userName', userName);
        localStorage.setItem('pass', 'true');
        this.routing.navigateByUrl('/admin');
      }  
      else alert("Admin Login Failed");
    } else {
      alert("Please select user type.")
    }
  }

  /* LOGOUT FOR USER AND ADMIN */
  logout() {
    localStorage.clear();
    alert("Logging out ...");
    this.routing.navigateByUrl('/login');
  }

}
