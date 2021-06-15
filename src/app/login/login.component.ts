import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/api/auth.service';
import { StorageHelper } from '../core/helper/storage.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    hide = true;
    checked = false;
    loginFormInstance: FormGroup = new FormGroup({});
    constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private _snackBar: MatSnackBar,
      private router: Router
      ) { }
  
    ngOnInit(): void {
      this.initForm();
    }
  
    initForm(){
      if(StorageHelper.getRememberEmail()==""){
        this.loginFormInstance = this.formBuilder.group({
          email: ["",Validators.required],
          password: ["",Validators.required]
        })
      } else {
        this.loginFormInstance = this.formBuilder.group({
          email: [StorageHelper.getRememberEmail(),Validators.required],
          password: [StorageHelper.getPasswordToken(),Validators.required]
        })
      }
    }
  
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
    }
    onLogin(){
      if(this.loginFormInstance.invalid)
      {
        return;
      }
      this.authService.login({email: this.email!.value, password: this.password!.value}).subscribe((response:any) => {
        if(response.token===StorageHelper.getRegisterToken())
        {
          console.log(this.password?.value);
          if(this.password?.value===StorageHelper.getPasswordToken()){
            StorageHelper.setToken(response.token);
            (<any>this.router).navigate(["/homepage"])
          }
          else{
            this.openSnackBar("Wrong password!", "Hide");
          }
        } else{
          this.openSnackBar("User not found!", "Hide");
        }
      }, (error: { error: { error: string; }; }) => {
        console.log(error)
        console.log(error.error.error)
        this.openSnackBar(error.error.error,"login");
      });
      if(this.checked){
        StorageHelper.setRememberEmail(this.email!.value);
      } else{
        StorageHelper.setRememberEmail("");
      }
    }
    onRegister(){
      (<any>this.router).navigate(["/register"]);
    }
  
    get email(){
      return this.loginFormInstance.get("email");
    }
  
    get password(){
      return this.loginFormInstance.get("password");
    }
  }
  
