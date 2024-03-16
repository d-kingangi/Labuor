import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import * as io from 'socket.io-client';
import { message, allMessagesResponse, messageInfoResponse } from '../Interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:3501'

  constructor(private http: HttpClient) { }

    /**
   * A description of the entire function.
   *
   * @param {message} message - description of parameter
   * @return {allMessagesResponse} description of return value
   */

  sendMessage(message: message){
    return this.http.post<allMessagesResponse>(`${this.apiUrl}/message`, message)
  }

  getAllMessages(){
    return this.http.get<allMessagesResponse>(`${this.apiUrl}/message`)
  } 

  getMessageById(messageId: string) {
    return this.http.get<messageInfoResponse>(`${this.apiUrl}/message/${messageId}`);
  }

  getAllMessagesByTalentId(talentId: string){
    return this.http.get<allMessagesResponse>(`${this.apiUrl}/message/talent/${talentId}`);
  }

  getAllMessagesByEmployerId(employerId: string){
    return this.http.get<allMessagesResponse>(`${this.apiUrl}/message/employer/${employerId}`);
  }

  getMessagesByTalentAndEmployerIds(talentId: string, employerId: string){
    return this.http.get<allMessagesResponse>(`${this.apiUrl}/message/talent/${talentId}/employer/${employerId}`);
  }


}
