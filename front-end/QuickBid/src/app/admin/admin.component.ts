import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() userName:string;

  constructor(private mainSrv:MainService,private routing:Router) { }

  ngOnInit() {
    let key = localStorage.getItem('pass');
    this.userName = localStorage.getItem('userName');
    if(key!="true"||this.userName!="admin") this.routing.navigateByUrl('/login');
  }

  user:User={
    "userName":"",
    "password":"",
    "dob":null,
    "fname":"",
    "lname":"",
    "phNumber":0,
    "address":"",
    "walletAmount":0,
    "key":""
  };
  
  logout() {
    this.mainSrv.logout();
  }

}
