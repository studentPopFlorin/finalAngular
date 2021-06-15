import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators{
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null as any;
          }
      
          const valid = regex.test(control.value);
      
          return valid ? null as any: error;
        };
      }

    public static wordLength(value: number): ValidatorFn{
        return (control: AbstractControl): {[key: string]:any} => {
            return control.value && control.value.trim().length >= value ? null as any : {minLength:true};
        };
    }
    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password')!.value;
        const confirmPassword: string = control.get('confirm')!.value; 
        if (password !== confirmPassword) {
          control.get('confirm')!.setErrors({ NoPassswordMatch: true });
        }
      }
}