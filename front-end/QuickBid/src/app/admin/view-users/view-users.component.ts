import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(private usrSrv:UserService) { }

  ngOnInit() {

    this.getUsers()

  }


  users:User[]=[];
  getUsers()
  {
    this.usrSrv.getAllUsers().subscribe(
      data => this.users=data,
      error => console.log(error)
     );
  }  

  deleteUser(value:any)
  {
    this.usrSrv.deleteUser(value).subscribe(
      async data=> { 
        let res=Object.values(data)[0]
        if(res=="true") {
          alert("USER DELETED")
        } else alert("UNABLE TO DELETE USER")
        this.getUsers();
      },
      error=> console.log(error)
    );
  }

}
