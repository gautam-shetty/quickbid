import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Winner } from '../models/Winner.model';

@Injectable({
  providedIn: 'root'
})
export class WinnerService {

  private BASE_URL="http://localhost:1111/winner";

  constructor(private http: HttpClient) { }

  saveWinner(winner: Winner)
  {
    return this.http.post<any>(`${this.BASE_URL}`, winner);
  }

  getAllWinners()
  {
    return this.http.get<Winner[]>(`${this.BASE_URL}`);
  }

  lastModfified()
  {
    return this.http.get<Winner>(`${this.BASE_URL}/latest`);
  }

}
