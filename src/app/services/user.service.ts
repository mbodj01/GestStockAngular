import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API = 'http://127.0.0.1:8000/api/auth/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public register (name : string,email : string,password : string , password_confirmation: string) : Observable<any>{
    return this.http.post(API,{
      name,
      email,
      password,
      password_confirmation
    })
  }

}
