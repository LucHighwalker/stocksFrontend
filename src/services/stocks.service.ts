import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  public symbols = new Subject<[]>();

  constructor(private http: HttpClient) {}

  getSymbols() {
    this.http
      .get<[]>('http://localhost:4040/api/stocks/symbols')
      .subscribe(resp => {
        this.symbols.next(resp);
      });
  }

  getStockRate(symbol, from, to = null) {
    return new Promise((resolve, reject) => {
      let url =
        'http://localhost:4040/api/stocks/' + symbol + '/' + String(from);
      if (to !== null) {
        url += '/' + String(to);
      }
      this.http.get<any>(url).subscribe(resp => {
        if (resp.error) {
          reject(resp);
        } else {
          resolve(resp);
        }
      });
    });
  }

  getStockData(symbol) {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>('http://localhost:4040/api/stocks/' + symbol)
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
