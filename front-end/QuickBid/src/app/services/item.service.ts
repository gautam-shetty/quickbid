import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private BASE_URL="http://localhost:1111/item";

  constructor(private http: HttpClient) { }

  saveItem(item: Item)
  {
    return this.http.post<any>(`${this.BASE_URL}`, item);
  }

  getAllItems()
  {
    return this.http.get<Item[]>(`${this.BASE_URL}`);
  }

  getLastItemId()
  {
    return this.http.get<Item>(`${this.BASE_URL}/count`);
  }

  getItem(itemId: number)
  {
    return this.http.get<Item>(`${this.BASE_URL}/${itemId}`);
  }

  getItemByStatus(status: boolean)
  {
    return this.http.get<Item>(`${this.BASE_URL}/status/${status}`);
  }

  getItemByName(itemName: string)
  {
    return this.http.get<Item[]>(`${this.BASE_URL}/name/${itemName}`);
  }

  approveItem(itemId: number)
  {
    return this.http.put<Item[]>(`${this.BASE_URL}/approve/${itemId}`, null);
  }

  disapproveItem(itemId: number)
  {
    return this.http.put<Item[]>(`${this.BASE_URL}/disapprove/${itemId}`, null);
  }

  deleteItem(itemId:number)
  {
    return this.http.delete(`${this.BASE_URL}/${itemId}`);
  }

}
