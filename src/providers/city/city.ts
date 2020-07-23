import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';

//const BASEURL = 'http://localhost:3000/api/chatapp';

/*
  Generated class for the CityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CityProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CityProvider Provider');
  }
  
  addCity(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/city/add-new-city` , body);
  }
  
  GetAllCities(): Observable<any>{
    return this.http.get(`${BASEURL}/all-cities`);
  }
  
  getCity(id): Observable<any>{
    return this.http.get(`${BASEURL}/city/${id}`);
  }
  
  DeleteCity(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-city/${id}`, {
      id,
    });
  }
  
  editCity(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/city/edit-city` , body);
  }

}
