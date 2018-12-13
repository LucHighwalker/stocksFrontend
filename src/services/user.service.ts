import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public signupMsg = new Subject<{}>();
  public loginMsg = new Subject<{}>();

  public userUpdate = new Subject<{}>();

  private curUser: {};

  constructor(private http: HttpClient) {}

  getUser(): any {
    return this.curUser ? this.curUser : null;
  }

  signup(body) {
    this.http
      .post<{ signup: string; token: any; error: any }>(
        'http://localhost:4040/api/auth/signup',
        body
      )
      .subscribe(resp => {
        this.signupMsg.next(resp);
      });
  }

  login(body) {
    this.http
      .post<{ signup: string; token: any; error: any }>(
        'http://localhost:4040/api/auth/login',
        body
      )
      .subscribe(resp => {
        this.loginMsg.next(resp);
      });
  }

  updateUser(token) {
    this.http
      .get<{ signup: string; token: any; error: any }>(
        'http://localhost:4040/api/auth/getuser', {
          headers: new HttpHeaders().set('token', token)
        }
      )
      .subscribe(resp => {
        this.curUser = resp;
        console.log(resp);
        this.userUpdate.next(resp);
      });
  }
}
