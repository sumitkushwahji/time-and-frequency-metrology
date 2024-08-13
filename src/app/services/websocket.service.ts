import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; // Default import
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Client | undefined;
  private ticDataSubject = new Subject<{ timestamp: string; value: number }>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      debug: (str) => console.log(str),
      onConnect: () => {
        this.stompClient?.subscribe('/topic/tic-data', (message: Message) => {
          const [timestamp, valueStr] = message.body.split(' ').slice(0, 2);
          const value = parseFloat(valueStr);
          this.ticDataSubject.next({ timestamp, value });
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      // More options can be set here as needed
    });

    this.stompClient.activate();
  }

  public getTicData() {
    return this.ticDataSubject.asObservable();
  }

  public disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
