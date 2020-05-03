import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../shared/socket.service';
import { User } from '../users/models/user.model';
import { Message } from '../users/models/message.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() user: User;
  input: string;
  messages: Message[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.onMessage().subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  public sendMessage(): void {
    this.socketService.send({
      from: this.user,
      content: this.input
    });
    this.input = '';
  }

  handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
