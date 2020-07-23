import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';

//const BASEURL = 'http://localhost:3000/api/chatapp';

/*
  Generated class for the DistrictProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DistrictProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DistrictProvider Provider');
  }
  
  addDistrict(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/district/add-new-district` , body);
  }
  
  GetAllDistricts(): Observable<any>{
    return this.http.get(`${BASEURL}/all-districts`);
  }
  
  getDistrict(id): Observable<any>{
    return this.http.get(`${BASEURL}/district/${id}`);
  }
  
  DeleteDistrict(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-district/${id}`, {
      id,
    });
  }
  
  editDistrict(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/district/edit-district` , body);
  }

}
