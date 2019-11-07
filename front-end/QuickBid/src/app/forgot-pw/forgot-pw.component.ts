import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.css']
})
export class ForgotPwComponent implements OnInit {

  constructor(private userSrv: UserService, private router: Router) { }

  ngOnInit() {
  }

  userName:string="";
  ans:string;
  newpass:string;
  pass:boolean=false;

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

  forgot()
  {
    this.userSrv.getUser(this.userName).subscribe(
      data => {
        this.user = data;
        console.log(this.user.key);
        if(this.user.key===this.ans) {
          this.pass=true
        } else alert("Answer did not mactched with the user's answer.");
      }, error=> console.log(error)
      );
  }

  reset(){
    this.userSrv.resetPw(this.userName,this.newpass).subscribe(
      data => { alert("Password reset successfully.") 
      this.router.navigateByUrl("/login");
      }, error => console.log(error)
    );
  }

}
