import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import {DashboardService} from '../services/dashboard.service';
import { AppUser } from '../model/utilisateur.model';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
const API = 'http://127.0.0.1:8000/api/auth/me'
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
errorMessage: any;
  name: any;

constructor(
  private http : HttpClient,
  public loginService : LoginService,
  public tokenService : TokenStorageService,
  private dashboardService : DashboardService,
  ){
  // this.autUser();
}
ngOnInit(){
  this.autUser();
}

public autUser(){
  this.dashboardService.user()
  .subscribe({
    next : (response) =>{
      this.name = response.data.name;
    },
    error : (error) =>{
      console.error(error);
      this.errorMessage = error.message;
    }
  });
}
public deconnexion(){
  this.tokenService.signOut();
}
}
