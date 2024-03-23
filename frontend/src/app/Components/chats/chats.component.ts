import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { Observable } from 'rxjs';
import { message, allMessagesResponse, messageInfoResponse } from '../../Interfaces/message.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { SocketIoModule, Socket } from 'ngx-socket-io';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [ NavbarComponent, FormsModule, CommonModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})

export class ChatsComponent implements OnInit{

  messages$: Observable<allMessagesResponse | null>   = of(null);;
  newMessage: message = { orgId: '', talentId: '', content: '', timestamp: new Date() };
  talentId: string = '';
  orgId: string = '';
  
  constructor(private authservice: AuthServiceService,private chatService: ChatService, private route: ActivatedRoute, private router: Router) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orgId = params['id'];
      this.loadMessages();
    });
  }

  loadMessages() {
    // this.messages$ = this.chatService.getAllMessagesByTalentId(talentId);
    // this.messages$ = this.chatService.getAllMessages();
  }

  sendMessage() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    this.authservice.readToken(token).subscribe(
      (res) => {
        if ('talentId' in res.info) {
          this.talentId = res.info.talentId as string;
          console.log('TalentId messages', this.talentId);
          const message: message = {
            talentId: this.talentId,
            orgId: this.orgId,
            content: this.newMessage.content,
            timestamp: new Date()
          };

          if (this.newMessage.content.trim()) {
            this.newMessage.timestamp = new Date();

            this.chatService.sendMessage(message).subscribe(
              (res) => {
                this.newMessage.content = '';
                this.loadMessages();
                console.log('Message sent successfully', res);
              },
              (error) => {
                console.error('Error sending messages', error);
              }
            );
          }
        } else {
          console.error('ID not found in response:', res.info);
        }
      }
    );
  }
}
