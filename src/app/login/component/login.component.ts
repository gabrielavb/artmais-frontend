import { Component } from '@angular/core';
import { LoginResponseDto, LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = {
    email: null,
    password: null,
  };
  errorMessage = '';
  redirectTo: string = '';
  roles: string[] = [];
  loginReturn: boolean = false;
  erroLogin: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  public loginArtPlus() {
    this.loginService
      .authenticate(this.form.email, this.form.password)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/homepage');
          this.loginReturn = true;
        },
        (err) => {
          if(err.status == 422){
            this.erroLogin = true;
          }
          throw err;
        }
      );
  }
}
