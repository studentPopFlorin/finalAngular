import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/api/auth.service';
import { CustomValidators } from '../core/helper/custom-validators';
import { StorageHelper } from '../core/helper/storage.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hideConfirm=true;
  registerFormInstance: FormGroup = new FormGroup({});
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
    this.registerFormInstance = this.formBuilder.group({
      email: ["eve.holt@reqres.in",Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ["",Validators.compose([
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[$-/:-?{-~!"^_`[]/, { hasSpecialCharacters: true }),
        Validators.minLength(6)
      ])],
      confirm:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    },
    {
      validator: CustomValidators.passwordMatchValidator
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  onRegister(){
    if(this.registerFormInstance.invalid)
    {
      return;
    }
    this.authService.register({email: this.email!.value, password: this.password!.value}).subscribe((response:any) => {
      StorageHelper.setRegisterToken(response.token);
      StorageHelper.setPasswordToken(this.password!.value);
      (<any>this.router).navigate(["/login"])
      this.openSnackBar("Registered successfully", "Hide");
    }, (error: { error: { error: string; }; }) => {
      console.log(error)
      console.log(error.error.error)
      this.openSnackBar(error.error.error,"register");
    });

  }

  get email(){
    return this.registerFormInstance.get("email");
  }

  get password(){
    return this.registerFormInstance.get("password");
  }
}
