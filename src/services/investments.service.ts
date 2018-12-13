import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {
  public investment = new Subject<{}>();

  constructor(private http: HttpClient) {}

  getInvestment(id) {
    this.http
      .get('http://localhost:4040/api/invest/' + String(id))
      .subscribe(resp => {
        this.investment.next(resp);
      });
  }

  newInvestment(body, token) {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>('http://localhost:4040/api/invest/new', body, {
          headers: new HttpHeaders().set('token', token)
        })
        .subscribe(resp => {
          if (resp.error) {
            reject(resp);
          } else {
            resolve(resp);
          }
        });
    });
  }
}
