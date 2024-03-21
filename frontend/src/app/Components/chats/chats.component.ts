import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { Observable } from 'rxjs';
import { message, allMessagesResponse, messageInfoResponse } from '../../Interfaces/message.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { SocketIoModule, Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';
import { talent } from '../../Interfaces/talent.inteface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiServiceService } from '../../Services/api-service.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [ NavbarComponent, FormsModule, CommonModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})

export class ChatsComponent implements OnInit{

  messages$: Observable<allMessagesResponse> | undefined;
  newMessage: message = { orgId: '', talentId: '', content: '', timestamp: new Date() };
  talentId: string = '';
  
  constructor(private authservice: AuthServiceService,private chatService: ChatService, private route: ActivatedRoute) {}


  ngOnInit(){
    // this.getTalentId()
    // this.loadMessages();
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token){
      return token
    } else {
      return 'null'
    }
  }

  // getTalentId(){
  //   this.route.params.subscribe(params =>{
  //     this.talentId = params['id']
  //     this.loadMessages(this.talentId)
  //   })
  // }

  loadMessages(talentId: string){
    this.messages$ = this.chatService.getAllMessages(talentId, true);
  }

  sendMessage(){
    if(this.newMessage.content.trim()){
      this.newMessage.timestamp = new Date()

      this.chatService.sendMessage(this.newMessage).subscribe(
          (res) =>{
          this.newMessage.content = ''
          this.loadMessages(this.talentId)
        }, error => {
          console.error('Error sending messages', error);      
        }
      )
    }
  } 
}
