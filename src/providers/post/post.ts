import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://compasstechs.in/foody-code/mobileapp/api';
//const BASEURL = 'http://localhost:3000/api/chatapp';
/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {

  constructor(private http: HttpClient) { }

  addPost(body): Observable<any>{
    return this.http.post(`${BASEURL}/post/add-post`,body);
  }

  getAllPosts(): Observable<any>{
    return this.http.get(`${BASEURL}/posts`);
  }

  addLike(body): Observable<any>{
    return this.http.post(`${BASEURL}/post/add-like`,body);
  }

  addComment(postId , comment): Observable<any>{
    return this.http.post(`${BASEURL}/post/add-comment`, {
      postId,
      comment
    });
  }

  getPost(id): Observable<any>{
    return this.http.get(`${BASEURL}/post/${id}`);
  }

}
