import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Interview Management System';
  loginForm: FormGroup;
  registerForm: FormGroup;
  user: User;
  registerUserObj: User;
  role: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  loginView: boolean = true;
  flag : boolean = false;
  admin: boolean = false;
  interviewer: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: AppService, private router: Router) {
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit() {
    this.router.navigate(['/']);
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(4)]],
      name: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });

  }

  logout() {
    this.user = null;
    sessionStorage.removeItem('token');
    this.router.navigate(['/'])
    this.admin = false;
    this.interviewer = false;
  }

  registerUser() {
    this.loginForm.reset()
    this.registerUserObj = new User();
    this.registerUserObj.name = this.registerForm.controls.name.value.charAt(0).toUpperCase() + this.registerForm.controls.name.value.slice(1);
    this.registerUserObj.email = this.registerForm.controls.email.value;
    this.registerUserObj.password = this.registerForm.controls.password.value;
    this.registerUserObj.isAdmin = false;
    this.service.register({ name: this.registerUserObj.name, email: this.registerUserObj.email, isAdmin: this.registerUserObj.isAdmin, password: this.registerUserObj.password }).subscribe(
      (response) => {

        this.registerForm.reset();
        this.successMessage = 'User ' + this.registerUserObj.email + ' registered successfully!';
        this.loginView = !this.loginView;
        setTimeout(() => {
          this.successMessage = '';
        }, 4000);

      },
      (error) => {
        this.registerForm.reset();

      }
    );

  }
  login() {
    this.service.login({ email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value }).subscribe(
      (response) => {
        sessionStorage.setItem('token', JSON.stringify(response));
        this.service.getUserDetails().subscribe(data => {
          this.user = data;

          if (data.role === 'Admin') {
            this.role = 'Admin';
            this.flag = true;
            this.router.navigate(['/dashboard']);
            this.admin = true;
          }
          else {
            this.role = 'Interviewer';
            this.flag = false;
           this.router.navigate(['/dashboard-interviewer'])
           this.interviewer = true;
          }
        });
        this.loginForm.reset();
      },
      (error) => {
        console.log(error.error)
        this.errorMessage = error.error;
        this.loginForm.reset();
      });
  }

  forgotPassword() {

  }

}
