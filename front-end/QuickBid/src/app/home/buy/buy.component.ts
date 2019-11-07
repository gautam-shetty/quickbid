import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { DatePipe } from '@angular/common';

import { UserService } from 'src/app/services/user.service';
import { ItemService } from 'src/app/services/item.service';
import { BidderService } from 'src/app/services/bidder.service';
import { WinnerService } from 'src/app/services/winner.service';

import { User } from 'src/app/models/User.model';
import { Item } from 'src/app/models/Item.model';
import { Bidder } from 'src/app/models/Bidder.model';
import { Winner } from 'src/app/models/Winner.model';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
  providers: [DatePipe]
})
export class BuyComponent implements OnInit {

  constructor(private usrSrv:UserService, private itmSrv:ItemService, private bidrSrv:BidderService, private winrSrv:WinnerService, private datePipe: DatePipe) { 
    // this.currDate = this.datePipe.transform(this.temp, 'yyyy-MM-dd');
    // this.now=10
    // let intid= this.timer=setInterval(()=>{ this.now -=1; if(this.now==0) clearInterval(intid) }, 1000);
  }

  @Input() userName:string;
  // timer
  // now:number; 
  
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.getUser();
    this.getOnSaleItem();
    this.getBidders();
    this.getLatestWinner();
  }

  /* -----------------
	 * Item Structure
	 * -----------------*/

  item:Item={
    "itemId":null,
    "itemName":"",
    "desc":"",
    "cost":null,
    "status":false,
    "userName":"",
    "imgPath":"",
  }

  getOnSaleItem(){
    this.itmSrv.getItemByStatus(true).subscribe(
      data=> this.item=data,
      error=> console.log(error)
    );
  }

  delItem() {
    this.itmSrv.deleteItem(this.item.itemId).subscribe(
      data => { console.log("Item deleted "+data) 
      this.getOnSaleItem()
      }, error => console.log(error)
    );
  }

  /* -----------------
	 * User Structure
	 * -----------------*/

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
  userTemp:User={
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

  getUser()
  {
     this.usrSrv.getUser(this.userName).subscribe(
      async data=> this.user=data,
      error=> console.log(error)
    );
  }

  getUserTemp(winnerName:string)
  {
     this.usrSrv.getUser(winnerName).subscribe(
      data=> {this.userTemp=data
        this.userTemp.walletAmount-=this.bidders[0].bidAmount
        this.updateUserTemp()
      }, error=> console.log(error)
    );
  }

  updateUser() {
    this.usrSrv.updateUser(this.user).subscribe(
     data=> this.user=data,
     error=> console.log(error)
   );
 }

 updateUserTemp() {
  this.usrSrv.updateUser(this.userTemp).subscribe(
   data=> this.userTemp=data,
   error=> console.log(error)
 );
}

  /* -----------------
	 * Bidder Structure
	 * -----------------*/

  bidder:Bidder={
    "userName":"",
    "bidAmount":null
  }

  validateBid() {
    let amt=parseInt((<HTMLInputElement>document.getElementById('cost')).value);
    if(amt>=this.item.cost&&amt<=this.user.walletAmount) {this.saveBidder()}
    else if(amt>this.user.walletAmount) {alert("Insufficient balance!!")}
    else if(amt<this.item.cost) {alert("Cannot bid less than the base price!!")}
    else {alert("ERROR while bidding")}

  }

  saveBidder() {
    this.bidder.userName=this.userName
    this.bidder.bidAmount=parseInt((<HTMLInputElement>document.getElementById('cost')).value);

    this.bidrSrv.saveBidder(this.bidder).subscribe(
      data => { console.log("Bid done.") 
      this.getBidders()
    }, error => console.log(error)
    );
  }

  bidders:Bidder[]=[];

  source = interval(2000);
  subscribe=this.source.subscribe(val => this.getBidders());

  getBidders() {
    this.bidrSrv.getAllBidders().subscribe(
      data => { this.bidders=data
        this.sortBidders()
        // console.log("All Bidders: "+this.bidders)
      }, error => console.log(error)
    );
  }

  sortBidders() {
    this.bidrSrv.sortAllBidders().subscribe(
      data => this.bidders=data, 
      error => console.log(error)
    );
  }

  endBid() {
    this.getUserTemp(this.bidders[0].userName)
    // console.log("TEMP: "+this.userTemp)
    alert("AUCTION STOPPED: "+this.bidders[0].userName+" won the bid!")
    this.user.walletAmount+=this.bidders[0].bidAmount
    this.updateUser()
    this.saveWinner()
  }

  deleteAllBidders() {
    this.bidrSrv.deleteAllBidders().subscribe(
      data => {console.log("Bidder History deleted "+data)
      this.delItem()
     } , error => console.log(error)
    );
  }
  
  /* -----------------
	 * Winner Structure
	 * -----------------*/

  winner:Winner={
    "userName":"",
    "bidAmount":null,
    "itemId":null,
    "itemName":""
  };
  currDate:string;
  // temp=new Date();

  // dateFormat = require('dateformat');

  saveWinner() {
  
  this.winner.userName=this.bidders[0].userName
  this.winner.bidAmount=this.bidders[0].bidAmount
  this.winner.itemId=this.item.itemId
  this.winner.itemName=this.item.itemName

    this.winrSrv.saveWinner(this.winner).subscribe(
      data => {
        console.log("Winner Saved")
        this.deleteAllBidders()
      }, error => console.log(error)
    );
  }

  getLatestWinner() {
     this.winrSrv.lastModfified().subscribe(
      async data=> this.winner=data,
      error=> console.log(error)
    );
  }

}
