import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://menufacil.net/newcode/mobileapp/api';
//const BASEURL = 'http://localhost:3000/api/chatapp';

/*
  Generated class for the StreetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StreetProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StreetProvider Provider');
  }
  
  addStreet(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/street/add-new-street` , body);
  }
  
  GetAllStreets(): Observable<any>{
    return this.http.get(`${BASEURL}/all-streets`);
  }
  
  getStreet(id): Observable<any>{
    return this.http.get(`${BASEURL}/street/${id}`);
  }
  
  DeleteStreet(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-street/${id}`, {
      id,
    });
  }
  
  editStreet(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/street/edit-street` , body);
  }

}
