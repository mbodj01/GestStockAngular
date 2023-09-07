import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/utilisateur.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  users : Array<AppUser> | undefined ;
  errorMessage: any;
  constructor(
    private loginService : LoginService,
  ){
    this.users=[
    {userId :  1,username : "user1",password : "passer123",role : ["USER"]},
    {userId : 2,username : "user2",password : "passer123",role : ["USER"]},
    {userId : 3,username : "admin",password : "passer123",role : ["USER","ADMIN"]},
   ];
  }
  ngOnInit(): void {
  }
  handleGetAllUsers(){
    if (this.loginService.isAuth()) {
      this.loginService.getAllUser().subscribe(
        {
          next : (data)=>{
            this.users=data;
          },
          error : (err)=>{
            this.errorMessage = err;
          }
        }
      );
    }
  }
}
