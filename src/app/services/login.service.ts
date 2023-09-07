import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users! : AppUser[];
  authenticatedUser : AppUser |undefined;
    constructor() {
      this.users=[
       {userId :  1,username : "user1",password : "passer123",role : ["USER"]},
       {userId : 2,username : "user2",password : "passer123",role : ["USER"]},
       {userId : 3,username : "admin",password : "passer123",role : ["ADMIN"]},
      ];
    }
    public login( username:string,password:string) : Observable<AppUser> {

      let appUser=this.users.find(u=>u.username==username);
      if (!appUser) return throwError(()=>new Error ("Utilisateur introuvable"));
      if (appUser.password !=password){
        return throwError(()=>new Error ("Verifiez les informations"))
      }
      return of(appUser);
    }

    public logUser (appUser : AppUser): Observable<boolean>{
      this.authenticatedUser = appUser;
      localStorage.setItem("authUser",JSON.stringify({username: appUser.username, role:appUser.role,jwt:"JWT_TOKEN"}))
      return of(true);
    }

    public getAllUser() : Observable<AppUser[]>{
      return of(this.users);
     }
     public isAuth(){
      return this.authenticatedUser != undefined;
    }

}
