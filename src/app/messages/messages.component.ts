import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // public because it will be binded to in the template
      // and Angular binding only works on public variables
  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
