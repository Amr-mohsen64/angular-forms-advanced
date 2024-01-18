import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  // email = new FormControl("", {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: "blur",
  // });

  // password = new FormControl("", {
  //   validators: [
  //     Validators.required,
  //     Validators.minLength(8),
  //     createPasswordStrengthValidator(),
  //   ],
  // });

  // loginForm = new FormGroup({
  //   email: this.email,
  //   password: this.password,
  // });

  constructor(private fb: FormBuilder) {}
  //the nonNullable makes the fields string and not null at reset state
  // constructor(private fb: NonNullableFormBuilder) {}

  loginForm = this.fb.group({
    email: this.fb.nonNullable.control("", {
      validators: [Validators.required, Validators.email],
      updateOn: "blur",
    }),
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
  });
  ngOnInit() {}

  login() {
    const formValue = this.loginForm.value;
    formValue;
  }

  reset() {
    this.loginForm.reset();
    this.loginForm.setErrors(null);
    // this.loginForm.controls.email.setValue("amr");
    console.log(this.loginForm.value);
  }
}
