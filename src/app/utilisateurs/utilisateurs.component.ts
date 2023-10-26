import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/utilisateur.model';
import { LoginService } from '../services/login.service';
import { UUID } from 'angular2-uuid';
import {UserService} from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  users : Array<AppUser> | undefined ;
   registerFormGroup! : FormGroup;
  errorMessage: any;
  constructor(
    private http : HttpClient,
    private fb :FormBuilder,
    private userService : UserService,
    private loginService : LoginService,
  ){
    this.users=[
    {userId : UUID.UUID(),username : "user1",password : "passer123"},
    {userId : UUID.UUID(),username : "user2",password : "passer123"},
    {userId : UUID.UUID(),username : "admin",password : "passer123"},
   ];
  }
  ngOnInit(): void {
    this.registerFormGroup=this.fb.group({
      name : this.fb.control(""),
      email : this.fb.control(""),
      password : this.fb.control(""),
      confirmation : this.fb.control(""),
    })
  }

   register(){
    let name = this.registerFormGroup.value.name;
    let email = this.registerFormGroup.value.email;
    let password = this.registerFormGroup.value.password;
    let confirmation = this.registerFormGroup.value.confirmation;
    this.userService.register(name,email,password,confirmation)
    .subscribe({
      next : (response)=>{
      console.log(response);
      window.location.reload()
    },
    error : (error) =>{
      console.error(error);
      this.errorMessage = error.message;
    }
    });
   }
  }

