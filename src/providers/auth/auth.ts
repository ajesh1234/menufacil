import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from '../../../node_modules/rxjs';

import { Observable } from 'rxjs-compat/Observable';

//const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';
const BASEURL = 'http://18.144.17.103:3001/api/chatapp';
//const BASEURL = 'http://sites.indiit.com/foody/mobileapp/api';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {

  }

  RegisterUser(username, email, password): Observable<any>{
	  
	 
	  
	  
    return this.http.post(`${BASEURL}/register`, {
        username,
        email,
        password
    });
  }

  LoginUser(username, password): Observable<any>{
    return this.http.post(`${BASEURL}/login`, {
        username,
        password
    });
  }

  GetAllUsers(): Observable<any>{
    return this.http.get(`${BASEURL}/users`);
  }

}
