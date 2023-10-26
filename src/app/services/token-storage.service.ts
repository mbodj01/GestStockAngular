import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.getToken();
    const user = this.getUSer();

    if (user) {
      req = req.clone({
        setHeaders : {
          Authorization : `Bearer ${token}`
        }
      });
    }else{
      req = req.clone();
    }

    return next.handle(req);
  }
  signOut(): void{
    window.sessionStorage.clear();
  }

  public saveToken(token : string) : void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken() : string | null {
    // console.log(window.sessionStorage.getItem(TOKEN_KEY));

    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser (user : any) : void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  public getUSer():any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user){
      return JSON.parse(user);
    }
    return {};
  }
}
