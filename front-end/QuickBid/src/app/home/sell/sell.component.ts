import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/Item.model';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  constructor(private http: HttpClient ,private itmSrv : ItemService) { }

  @Input() userName:string;

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.getLastItemId();
  }

  item:Item={
    "itemId":null,
    "itemName":"",
    "desc":"",
    "cost":null,
    "status":false,
    "userName":"",
    "imgPath":"",
  }

  saveItem() {
    this.item.userName=this.userName
    // this.item.imgPath="../assets/default.png"
    this.item.status=false

    this.submitUpload(this.Files);

    this.itmSrv.saveItem(this.item).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    alert("Item sent for verification.")
  }

  getLastItemId(){
    this.itmSrv.getLastItemId().subscribe(
      data=> {
        if(data==null) this.item.itemId=1
        if(data!=null) this.item.itemId=data.itemId+1
      }, error=> console.log(error)
    );
  }

  /* File Upload */
  file:string;
  percentDone: number;
  uploadSuccess: boolean;

  upload(files:File[]){
    this.Files=files;
  }

  submitUpload(files: File[]){
    this.file=files[0].name;
    this.item.imgPath="../assets/Uploads/"+this.file;
    this.uploadAndProgress(files);
  }

  Files:File[];
  uploadAndProgress(files: File[]){

    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))

    this.http.post('http://localhost:1111/api/files', formData, {reportProgress: true, observe: 'events'}).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });

  }

}
