import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  constructor(private itmSrv:ItemService) { }

  ngOnInit() {
    this.getItems()
  }

  items : Item[]=[];
  getItems()
  {
    this.itmSrv.getAllItems().subscribe(
      data => { this.items=data
        this.checkPass()
      }, error => console.log(error)
    );
  }

  approve(itemId){
    this.itmSrv.approveItem(itemId).subscribe(
      data => {this.items= data
        this.checkPass()
      },error => console.log(error)
    );
  }

  disapprove(itemId){
    this.itmSrv.disapproveItem(itemId).subscribe(
      data => {this.items=data
        this.checkPass()
      },error => console.log(error)
    );
  }

  pass:boolean
  checkPass() {
    this.pass=true;
    for (var item of this.items) { if(item.status) this.pass=false; }
  }

}
