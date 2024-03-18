import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { Observable } from 'rxjs';
import { message, allMessagesResponse, messageInfoResponse } from '../../Interfaces/message.interface';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})

export class ChatsComponent implements OnInit{

  messages$: Observable<allMessagesResponse> | undefined;
  newMessage: message = { orgId: '', talentId: '', content: '', timestamp: new Date() };
  
  constructor(private chatService: ChatService) {}


  ngOnInit(){
    this.loadMessages();
  }

  loadMessages() {
    this.messages$ = this.chatService.getAllMessages();
  }

  sendMessage(){
    if(this.newMessage.content.trim()){
      this.newMessage.timestamp = new Date()

      this.chatService.sendMessage(this.newMessage).subscribe(
          (res: messageInfoResponse) =>{
          this.newMessage.content = ''
          this.loadMessages()
        }, error => {
          console.error('Error sending messages', error);      
        }
      )
    }
  }
  
}
