import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ConfirmPasswordValidator(control:AbstractControl){
    const password=control.get('Password')
    const confirmPassword=control.get('confirmPassword')
    
    return password && confirmPassword && password.value !== confirmPassword.value
        ? {'misMatch':true}:null;
}
