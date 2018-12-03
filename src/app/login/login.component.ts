import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public confPassword: string;

  public showSignup: boolean;
  public loggedIn: boolean;

  private curToken: string;
  private curUser: {};

  constructor(private user: UserService, private cookie: CookieService) {}

  ngOnInit() {
    this.user.loginMsg.subscribe((msg: { login: string; token: string }) => {
      this.createToken(msg.token);
    });
    this.user.signupMsg.subscribe((msg: { signup: string; token: string }) => {
      this.createToken(msg.token);
    });
    this.user.userUpdate.subscribe((user: { user: {}, token: string }) => {
      if (user.user !== null) {
        this.curUser = user;
        this.loggedIn = true;
        console.log('loggedin');
      } else {
        this.curUser = null;
        this.loggedIn = false;
        console.log('wtf');
      }
    });
    this.curToken = this.cookie.get('invesToken');
    console.log(this.curToken);
    this.user.updateUser(this.curToken);
  }

  login() {
    this.user.login({
      email: this.email,
      password: this.password
    });
  }

  signup() {
    this.user.signup({
      email: this.email,
      password: this.password
    });
  }

  toggleSignup() {
    this.showSignup = !this.showSignup;
  }

  createToken(token) {
    this.cookie.set('invesToken', token, 99999);
    this.curToken = token;
    this.user.updateUser(token);
  }

  logout() {
    this.cookie.delete('invesToken');
    this.loggedIn = false;
    this.user.updateUser('');
  }
}
