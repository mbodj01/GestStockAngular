import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { AppUser } from '../model/utilisateur.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
[x: string]: any;
public userData : any;
public userJson : any;
public user : any;
constructor(
  public loginService : LoginService,
){
  this.userData = localStorage.getItem("authUser")
  this.userJson = JSON.parse(this.userData)
  if(this.userJson!=null){
    this.user = this.userJson.username;
  }
  else{
  alert("Veuillez vous connectez")
  this['router'].navigateByUrl("/login");
  }

}
}
