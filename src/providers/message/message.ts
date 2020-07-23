import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL = 'https://sleepy-island-78172.herokuapp.com/api/chatapp';
//const BASEURL = 'http://localhost:3000/api/chatapp';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  constructor(private http: HttpClient) {
  }

  SendMessage(senderId, receiverId, receiverName , message): Observable<any>{
    return this.http.post(`${BASEURL}/chat-messages/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message
    });
  }

  GetAllMessages(senderId, receiverId): Observable<any>{
    return this.http.get(`${BASEURL}/chat-messages/${senderId}/${receiverId}`);
  }

  MarkMessages(sender, receiver): Observable<any>{
    return this.http.get(`${BASEURL}/receiver-messages/${sender}/${receiver}`)
  }

  MarkAllMessages(): Observable<any>{
    return this.http.get(`${BASEURL}/mark-all-messages`);
  }

}
