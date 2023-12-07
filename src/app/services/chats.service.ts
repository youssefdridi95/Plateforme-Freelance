import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private env: Env = environments as Env
  constructor(private http: HttpClient) {
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

  addChat(sUserId: any,fUserId :any) {
    return this.http.post(this.env.backendUrl + this.env.createChat, {
      "firstUserId": fUserId,
      "secondUserId": sUserId,
      "messageList": []
  })
  }


  markMsgSeen(chatId: any,userId :any) {
    return this.http.post(this.env.backendUrl + this.env.markMessageSeen+chatId+'/'+userId,{})
  }
  getChat(chatId: any) {
    // const params = new HttpParams()
    // .set('' ,userId)

    return this.http.get(this.env.backendUrl + this.env.chat +chatId)
  }

  }


