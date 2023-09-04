import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userFormGroup! : FormGroup;
  errorMessage: any;
  constructor(
    private fb : FormBuilder,
    private loginService : LoginService,
    private router : Router,
  ){}

  ngOnInit():void{
    if (localStorage) {
      localStorage.removeItem("authUser");
    }
    this.userFormGroup=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control(""),
    })
  };


handleLogin() {
  let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.loginService.login(username,password).subscribe({
      next : (appUser)=>{
        this.loginService.logUser(appUser).subscribe({
          next : (data)=>{
            this.router.navigateByUrl("/dashboard/reporting");
          }
        });
      },
      error : (err: any)=>{
        this.errorMessage = err;
      }
    })
}
}
