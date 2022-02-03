import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage!: string;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit() { 
  }

  loginUser() {
    if(this.signinForm.value.username != '' && this.signinForm.value.password != ''){
      this.authService.signIn(this.signinForm.value).then(error => {
        if(error)
        {
          if(error.status == 400)
          {
            this.errorMessage = "Incorrect username or password.";
          }
          else {
            this.errorMessage = "Server is not responding. Please try again later.";
          }
        } 
      })
    } else {
      this.errorMessage = "Please enter your account credentials.";
    }
  }

}
