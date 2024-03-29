import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://compasstechs.in/foody-code/mobileapp/api';
//const BASEURL = 'http://localhost:3000/api/chatapp';
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrderProvider Provider');
  }

  addOrder(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/order/add-new-order` , body);
  }

  GetOrdersByUser(id): Observable<any>{
    return this.http.get(`${BASEURL}/orders-user/${id}`);
  }

  getOrder(id): Observable<any>{
    return this.http.get(`${BASEURL}/get-order/${id}`);
  }

}
