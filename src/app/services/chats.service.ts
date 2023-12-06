import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Env } from '../env';
import { environments } from 'src/enviroments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filter } from 'rxjs/operators'; // Import the filter operator

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private socket$: WebSocketSubject<any>;
  private env: Env = environments as Env
  constructor(private http: HttpClient) {
    this.socket$ = webSocket('ws://localhost:9090/ws');
    this.connect();
  }
  connect(): void {
    this.socket$.subscribe(
      (message) => {
        console.log('Received message:', message);
      },
      (error) => {
        console.error('Error:', error);
      },
      () => {
        console.log('WebSocket connection closed');
      }
    );
  }

  connectUser(userId: any) {
    return this.http.post(this.env.backendUrl + this.env.connectUser, {
      "userId": userId
    })
  }

  disConnectUser(userId: any) {
    return this.http.post(this.env.backendUrl + this.env.disConnectUser, {
      "userId": userId
    })


  }

  getChatList(userId: any) {
    // const params = new HttpParams()
    // .set('' ,userId)

    return this.http.get(this.env.backendUrl + this.env.chatList +userId)
  }
  getUsername(userId: any) {
    // const params = new HttpParams()
    // .set('' ,userId)

    return this.http.get(this.env.backendUrl + this.env.username +userId)
  }


  sendMessage(ChatId: string, senderId: string, receiverId: string, replyMessage: string): void {
    this.socket$.next({
      destination: '/chats/addMessage/' + ChatId,
      body: JSON.stringify({
        senderId: senderId,
        receiverId: receiverId,
        replymessage: replyMessage,
      })
    });


    
  }



  subscribeToChat(chatId: string, displayMessage: (message: any) => void): void {
    this.socket$.pipe(
      filter(message => message.destination === '/topic/chats/' + chatId),
    ).subscribe(response => {
      const message = JSON.parse(response.body);
      displayMessage(message);
    });
  }

}


