import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://menufacil.net/newcode/mobileapp/api';
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

  getItem(item_id,merchant_id): Observable<any>{
    return this.http.post(`${BASEURL}/GetItemDetails`,{
      item_id,
      merchant_id
    });
  }

  editItem(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/item/edit-item` , body);
  }

  GetItemByCategory(merchant_id,cat_id,lng,foodname): Observable<any>{
    return this.http.post(`${BASEURL}/getitembycategory/`,{
      merchant_id,
      cat_id,
      lng,
      foodname
    });
  }



  DeleteItem(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-item/${id}`, {
      id,
    });
  }

}
