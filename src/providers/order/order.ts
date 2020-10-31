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
    return this.http.post(`${BASEURL}/PlaceOrder` , body);
  }

  GetOrdersByUser(client_token): Observable<any>{
    return this.http.post(`${BASEURL}/getOrderHistory`,{
      client_token
    });
  }

  GetReviews(client_token,merchant_id): Observable<any>{
    return this.http.post(`${BASEURL}/MerchantReviews`,{
      client_token,
      merchant_id
    });
  }

  getOrder(body): Observable<any>{
    return this.http.post(`${BASEURL}/getReceipt`, body);
  }

  getAllOrders(body): Observable<any>{
    return this.http.post(`${BASEURL}/getAllReceipts`, body);
  }

  getpayment(body): Observable<any>{
    return this.http.post(`${BASEURL}/PayStp`, body);
  }

  getcodpayment(body): Observable<any>{
    return this.http.post(`${BASEURL}/PayCod`, body);
  }

  cancelOrder(body): Observable<any>{
    return this.http.post(`${BASEURL}/requestCancelOrder`, body);
  }

  reviewOrder(body): Observable<any>{
    return this.http.post(`${BASEURL}/AddReview`, body);
  }

}
