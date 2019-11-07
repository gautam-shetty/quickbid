import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { User } from '../models/User.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private mainSrv:MainService,private userSrv:UserService, private routing:Router) { 
    let year =this.today.getFullYear()-18
    let month=this.today.getMonth()+1;
    let dd=this.today.getDate();
    let monthn; let ddn;
    if(month<10) monthn=0+""+month; else monthn=month;
    if(dd<10) ddn=0+""+dd; else ddn=dd;
    this.todayMax=year+"-"+monthn+"-"+ddn;
    console.log(this.todayMax)
  }

  ngOnInit() {
  }

  today=new Date(); todayMax;

  user:User={
    "userName":"",
    "password":"",
    "dob":null,
    "fname":"",
    "lname":"",
    "phNumber":null,
    "address":"",
    "walletAmount":0,
    "key":""
  };

  validateUser() {
    this.userSrv.getUser(this.user.userName).subscribe(
      async data=> {
        if(data==null) this.saveUser()
        else if(data!=null) alert("Username already taken. Try with different username")
      }, error=> console.log(error)
    );
  }

  saveUser() {
    // console.log(this.user);
   this.mainSrv.saveUser(this.user);
    alert("User successfully registered")
    this.routing.navigateByUrl('/login')
  }

}
