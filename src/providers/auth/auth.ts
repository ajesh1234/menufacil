import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from '../../../node_modules/rxjs';

import { Observable } from 'rxjs-compat/Observable';

//const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';
//const BASEURL = 'http://18.144.17.103:3001/api/chatapp';
const BASEURL = 'http://compasstechs.in/foody-code/mobileapp/api';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {

  }

  RegisterUser(first_name, last_name, contact_phone, email_address, password, cpassword): Observable<any>{
	  
    return this.http.post(`${BASEURL}/signup`, {
        first_name,
        last_name,
        contact_phone,
        email_address,
        password,
        cpassword
    });
  }

  ResetUser(npass, cpass, client_id): Observable<any>{
    
    return this.http.post(`${BASEURL}/resetpassword`, {
        npass,
        cpass,
        client_id
    });
  }

  LoginUser(email_address, password): Observable<any>{
    return this.http.post(`${BASEURL}/login`, {
        email_address,
        password
    });
  }

  ForgotUser(email_address): Observable<any>{
    return this.http.post(`${BASEURL}/forgotpassword`, {
        email_address
    });
  }

  GetAllUsers(): Observable<any>{
    return this.http.get(`${BASEURL}/users`);
  }

}
