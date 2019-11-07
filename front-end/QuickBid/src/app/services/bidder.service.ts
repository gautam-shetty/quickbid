import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bidder } from '../models/Bidder.model';

@Injectable({
  providedIn: 'root'
})
export class BidderService {

  private BASE_URL="http://localhost:1111/bidder";

  constructor(private http: HttpClient) { }

  saveBidder(bidder: Bidder)
  {
    return this.http.post<any>(`${this.BASE_URL}`, bidder);
  }

  getAllBidders()
  {
    return this.http.get<Bidder[]>(`${this.BASE_URL}`);
  }

  deleteAllBidders()
  {
    return this.http.delete(`${this.BASE_URL}`);
  }

  sortAllBidders()
  {
    return this.http.get<Bidder[]>(`${this.BASE_URL}/sort`);
  }

}
