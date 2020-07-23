import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';
//const BASEURL = 'http://localhost:3000/api/chatapp';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  constructor(private http: HttpClient) { }

  GetAllUser(): Observable<any>{
    return this.http.get(`${BASEURL}/users`);
  }

  GetUserById(id): Observable<any>{
    return this.http.get(`${BASEURL}/user/${id}`);
  }

  GetUserByName(username): Observable<any>{
    return this.http.get(`${BASEURL}/username/${username}`);
  }

  FollowUser(userFollowed): Observable<any>{
      return this.http.post(`${BASEURL}/follow-user`,{
        userFollowed
      });
  }

  UnFollowUser(userFollowed): Observable<any>{
    return this.http.post(`${BASEURL}/unfollow-user`,{
      userFollowed
    });
  }

  MarkNotification(id, deleteValue?): Observable<any>{
    return this.http.post(`${BASEURL}/mark/${id}`, {
      id,
      deleteValue
    });
  }

  MarkAllAsRead(): Observable<any>{
    return this.http.post(`${BASEURL}/mark-all`, {
      all: true
    });
  }

  AddImage(image) : Observable<any>{
    return this.http.post(`${BASEURL}/upload-image`, {
      image
    });
  }

  SetDefaultImage(imageId, imageVersion): Observable<any>{
    return this.http.get(`${BASEURL}/set-default-image/${imageId}/${imageVersion}`);
  }

  ProfileNotifications(id): Observable<any>{
    return this.http.post(`${BASEURL}/user/view-profile`, {id});
  }

  ChangePassword(body): Observable<any>{
    return this.http.post(`${BASEURL}/change-password` , body);
  }

  UpdateLocation(body): Observable<any>{
    return this.http.post(`${BASEURL}/update-location` , body);
  }
  
  UpdateProfileImage(body): Observable<any>{
    return this.http.post(`${BASEURL}/update-profile-image` , body);
  }
  
  AddToWishlist(id,restaurantId,restaurantName): Observable<any>{
    return this.http.post(`${BASEURL}/add-to-wishlist` , {id,restaurantId,restaurantName});
  }
  
  RemoveFromWishlist(id): Observable<any>{
    return this.http.post(`${BASEURL}/remove-from-wishlist` , {id});
  }

}
