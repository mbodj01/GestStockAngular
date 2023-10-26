import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/utilisateur.model';
import {UUID} from 'angular2-uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = 'http://127.0.0.1:8000/api/auth/login';
const httpOptions = {
  headers : new HttpHeaders({'Content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users! : AppUser[];
  authenticatedUser : AppUser |undefined;
    constructor(private http : HttpClient) {}

    connexion(email: string,password: string):Observable<any>{
      return this.http.post(AUTH_API,{
        email,
        password
      },httpOptions)
    }
}
