import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';
//const BASEURL = 'http://localhost:3000/api/chatapp';
/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(private http: HttpClient) { }

  addCategory(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/category/add-new-category` , body);
  }

  GetAllCategories(): Observable<any>{
    return this.http.get(`${BASEURL}/all-categories`);
  }

  GetCategoryByRestaurant(id): Observable<any>{
    return this.http.get(`${BASEURL}/category-restaurant/${id}`);
  }


  getCategory(id): Observable<any>{
    return this.http.get(`${BASEURL}/category/${id}`);
  }



  editCategory(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/category/edit-category` , body);
  }



  DeleteCategory(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-category/${id}`, {
      id,
    });
  }

}
