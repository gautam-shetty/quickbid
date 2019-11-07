import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() userName:string;

  constructor(private mainSrv:MainService, private routing:Router) { }

  ngOnInit() {
    let key = localStorage.getItem('pass');
    this.userName = localStorage.getItem('userName');
    if(key!="true"||this.userName=="admin") this.routing.navigateByUrl('/login');
  }

  logout() {
    this.mainSrv.logout();
  }

}