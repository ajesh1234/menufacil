import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://menufacil.net/newcode/mobileapp/api';
//const BASEURL = 'http://localhost:3000/api/chatapp';
/*
  Generated class for the AddressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddressProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AddressProvider Provider');
  }

  addAddress(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/address/add-new-address` , body);
  }

  GetAddressByUser(id): Observable<any>{
    return this.http.get(`${BASEURL}/user-address/${id}`);
  }

  DeleteAddress(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-address/${id}`, {
      id,
    });
  }
  
  editAddress(body): Observable<any>{
	  
	console.log(body);
    return this.http.post(`${BASEURL}/address/edit-address`, body);
  }



}
