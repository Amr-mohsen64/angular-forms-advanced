import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Directive({
  selector: "[passwordStrength]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true,
    },
  ], // tell angular that is a form field validation directive
})
export class PasswordStrengthDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors {
    return createPasswordStrengthValidator()(control);
  }
}
