import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://compasstechs.in/foody-code/mobileapp/api';
//const BASEURL = 'http://localhost:3000/api/chatapp';
/*
  Generated class for the ItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {

  constructor(private http: HttpClient) { }

  addItem(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/item/add-new-item` , body);
  }

   GetAllItems(): Observable<any>{
    return this.http.get(`${BASEURL}/all-items`);
  }

  getItem(id): Observable<any>{
    return this.http.get(`${BASEURL}/item/${id}`);
  }

  editItem(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/item/edit-item` , body);
  }

  GetItemByCategory(id): Observable<any>{
    return this.http.get(`${BASEURL}/item-category/${id}`);
  }



  DeleteItem(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-item/${id}`, {
      id,
    });
  }

}
