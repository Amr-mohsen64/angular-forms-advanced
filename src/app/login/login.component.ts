import { Component, OnInit } from "@angular/core";
import { NgControl, NgForm, NgModel } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor() {}

  initialFormValue = {
    email: "amrmohsen72@gmai.com",
    password: "123",
  };
  ngOnInit() {}

  login(loginForm: NgForm, event) {
    console.log(loginForm.value, loginForm.valid);
  }

  onEmailChange(email: NgModel) {
    console.log(email.value);
  }

  onPasswordChange(password: NgModel) {
    // if (password.value.length > 8) {
    //   password.control.setErrors({ passwordInvalid: true });
    // }
  }
}
