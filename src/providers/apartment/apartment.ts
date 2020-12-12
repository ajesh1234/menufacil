import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://menufacil.net/newcode/mobileapp/api';
//const BASEURL = 'http://localhost:3000/api/chatapp';

/*
  Generated class for the ApartmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApartmentProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApartmentProvider Provider');
  }
  
   addApartment(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/apartment/add-new-apartment` , body);
  }
  
  GetAllApartments(): Observable<any>{
    return this.http.get(`${BASEURL}/all-apartments`);
  }
  
  getApartment(id): Observable<any>{
    return this.http.get(`${BASEURL}/apartment/${id}`);
  }
  
  DeleteApartment(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-apartment/${id}`, {
      id,
    });
  }
  
  editApartment(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/apartment/edit-apartment` , body);
  }

}
