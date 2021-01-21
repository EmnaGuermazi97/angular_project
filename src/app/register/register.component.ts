import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route, Router} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private message: "erreur";
  static user: User;
  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.form);
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.redirect();
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    this.redirect();
  }
  redirect() : void {
    this.router.navigate(['./members/create'], {queryParams: {cin: this.form.cin, email: this.form.email }}).then(r =>"");
     }

}
