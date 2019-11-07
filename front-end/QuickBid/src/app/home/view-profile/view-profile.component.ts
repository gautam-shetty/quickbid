import { Component, OnInit, Input } from '@angular/core';
import jsPDF from 'jspdf';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private userSrv:UserService) { }

  @Input() userName:string;
  visibility:string;

  ngOnInit() {
    this.visibility="show";
    this.userName = localStorage.getItem('userName');
    this.getUser();
  }

  toggle() { if(this.visibility=="show") this.visibility="edit"; else this.visibility="show"; }

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

  todate; tomonth; toyear; dob;

  getUser() {
     this.userSrv.getUser(this.userName).subscribe(
      data=> { this.user=data
        this.todate=new Date(this.user.dob).getDate();
        this.tomonth=new Date(this.user.dob).getMonth()+1;
        this.toyear=new Date(this.user.dob).getFullYear();
        this.dob=this.todate+'/'+this.tomonth+'/'+this.toyear;
      }, error=> console.log(error)
    );
  }

  updateUser() { 
    this.putUser()
    alert("User details saved.")
    this.visibility="show";
  }

  putUser() {
     this.userSrv.updateUser(this.user).subscribe(
      data=> this.user=data,
      error=> console.log(error)
    );
  }

  /* Add and withdraw money */

  tempMoney:number;

  addMoney() {
    this.tempMoney=parseInt((<HTMLInputElement>document.getElementById('money')).value);
    this.user.walletAmount+=this.tempMoney
    this.putUser()
    alert("₹"+this.tempMoney+" added successfully")
  }

  withdrawMoney() {
    this.tempMoney=parseInt((<HTMLInputElement>document.getElementById('money')).value);
    if(this.tempMoney>this.user.walletAmount) alert("Cannot withdraw amount more than existing amount.")
    else if(this.tempMoney<=this.user.walletAmount) {
      this.user.walletAmount-=this.tempMoney
      this.putUser()
      alert("₹"+this.tempMoney+" withdrawed successfully")
    } else alert("ERROR: ₹"+this.user.walletAmount+" withdraw failed!")
  }

  /* PDF Methods */

  downloadPDF() {
    let date=Date.now();
    let currDate=new Date(date)
    console.log(currDate.toString())
    var doc = new jsPDF()
    doc.setFontSize(7);
    doc.setTextColor(165, 165, 165);
    doc.text("Print date: "+currDate.toString(), 20, 20)

    doc.setFontSize(25);
    doc.setTextColor(76, 175, 80);
    doc.text("QuickBid", 20, 30)

    doc.setFontSize(17);
    doc.setTextColor(0, 0, 0);
    doc.text("(User Details)", 60, 30)

    doc.setFontSize(10);
    doc.setTextColor(92, 92, 92);
    doc.text("Username: "+this.user.userName, 20, 40)
    doc.text("D.O.B: "+this.dob, 20, 45)
    doc.text("Full name: "+this.user.fname+" "+this.user.lname, 20, 50)
    doc.text("Ph No.: "+this.user.phNumber, 20, 55)
    doc.text("Address: "+this.user.address, 20, 60)
    doc.setTextColor(69, 123, 217);
    doc.text("Wallet balance: INR "+this.user.walletAmount, 20, 70)

    doc.save('QuickBid_'+this.userName+'_details.pdf')
  }

}
