import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userFormGroup! : FormGroup;
  public getJsonValue : any;
  public postJsonValue : any;
  constructor(
    private tokenStorage: TokenStorageService,
    private http : HttpClient,
    private fb : FormBuilder,
    private loginService : LoginService,
    private router : Router,
  ){}

  ngOnInit():void{
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    if (localStorage) {
      localStorage.removeItem("authUser");
    }
    this.userFormGroup=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control(""),
    })
  };

  onSubmit(): void {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.loginService.connexion(username, password).subscribe(
      data => {
        this.tokenStorage.saveUser(data.data.user);
        this.tokenStorage.saveToken(data.data.access_token)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigateByUrl("/dashboard/reporting");
      },
      err => {
        //this.errorMessage = err.error.message;
        console.error(err);

        this.isLoginFailed = true;
      }
    );
  }

}
