import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/userData';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mainSrv:MainService, private routing:Router) { }

  ngOnInit() {
    let key = localStorage.getItem('pass');
    let userName = localStorage.getItem('userName');
    if(key=="true"&&userName!="admin") this.routing.navigateByUrl('/home');
    else if(key=="true"&&userName=="admin") this.routing.navigateByUrl('/admin');
  }

  userName=""; password=""; userType="";
  user=new UserData();

  chkLogin()
  {
    if(this.userName.length>0&&this.userName.length>0) this.mainSrv.chkLogin(this.userName,this.password, this.userType);
    else { alert("Fields cant be left empty.") }
  }

}
