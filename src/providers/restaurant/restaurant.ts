import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';
//const BASEURL = 'http://localhost:3000/api/chatapp';
const BASEURL = 'http://compasstechs.in/foody-code/mobileapp/api';

@Injectable()
export class RestaurantProvider {

  constructor(private http: HttpClient) { }

  addRestaurant(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/restaurant/add-new-restaurant` , body);
  }

  GetAllRestaurants(): Observable<any>{
    return this.http.get(`${BASEURL}/allrestaurant`);
  } 

  GetNearRestaurants(body): Observable<any>{
    return this.http.post(`${BASEURL}/nearmeSearch`, body);
  }

  getRestaurant(id): Observable<any>{
    return this.http.get(`${BASEURL}/restaurant/${id}`);
  }

  getRestaurantbyid(merchant_id): Observable<any>{
    return this.http.post(`${BASEURL}/RestaurantById`, {merchant_id});
  }

  editRestaurant(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/restaurant/edit-restaurant` , body);
  }



  DeleteRestaurant(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-restaurant/${id}`, {
      id,
    });
  }


}
