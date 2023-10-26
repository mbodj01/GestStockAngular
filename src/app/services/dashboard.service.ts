import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API = 'http://127.0.0.1:8000/api/auth/me'


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http : HttpClient,) { }

  public user(): Observable<any>{
    return this.http.get(API);
  }
}
