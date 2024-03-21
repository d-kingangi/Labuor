import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as io from 'socket.io-client';
import { message, allMessagesResponse, messageInfoResponse } from '../Interfaces/message.interface';
import { employer, allEmployersResponse, employerInfoResponse } from '../Interfaces/employer.interface';
import { talent, allTalentsResponse, talentInfoResponse } from '../Interfaces/talent.inteface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
  }


  getToken(){
    const token = localStorage.getItem('token') as string
    return token
  }

  readToken(token:string){
    return this.http.get<talentInfoResponse|employerInfoResponse>(`${this.apiUrl}/auth/checkdetails`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  checkUserDetails(token: string){
    return this.http.get<talentInfoResponse|employerInfoResponse>(`${this.apiUrl}/auth/checkdetails`, {
       headers: {
        token
      }
    })
  }

  sendMessage(message: message) {
    return this.http.post<allMessagesResponse>(`${this.apiUrl}/message`, message, {
      headers: this.getHeaders()
    });
  }
  

  getAllMessages(id: string, isTalent: boolean): Observable<allMessagesResponse> {
    let url: string;
    if (isTalent) {
      url = `${this.apiUrl}/message/talent/${id}`;
    } else {
      url = `${this.apiUrl}/message/employer/${id}`;
    }

    return this.http.get<allMessagesResponse>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  getMessageById(messageId: string) {
    return this.http.get<messageInfoResponse>(`${this.apiUrl}/message/${messageId}`, {
      headers: this.getHeaders()
    });
  }
  

  getAllMessagesByTalentId(talentId: string){
    return this.http.get<allMessagesResponse>(`${this.apiUrl}/message/talent/${talentId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  getAllMessagesByEmployerId(employerId: string){
    return this.http.get<allMessagesResponse>(`${this.apiUrl}/message/employer/${employerId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  getMessagesByTalentAndEmployerIds(talentId: string, employerId: string){
    return this.http.get<allMessagesResponse>(`${this.apiUrl}/message/talent/${talentId}/employer/${employerId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }


}
