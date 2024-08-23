import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const CHAT_URL = 'ws://172.16.18.190:8080/ws';

export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private subject: Subject<MessageEvent> | undefined;
  public messages: Subject<Message>;

  constructor() {
    this.messages = new Subject<Message>();
    this.connect(CHAT_URL);
  }

  private connect(url: string): void {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected to:', url);

      // Handle incoming messages
      this.subject.subscribe(
        (message: MessageEvent) => {
          console.log('Received data:', message.data);
          let data = JSON.parse(message.data);
          this.messages.next(data);
        },
        (error) => console.error('WebSocket error:', error),
        () => console.log('WebSocket connection closed')
      );
    }
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);
    const observable = new Observable<MessageEvent>(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return () => ws.close();
      }
    );
    const observer = {
      next: (data: any) => {
        console.log('Message sent to WebSocket:', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
      error: (err: any) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed'),
    };
    return new Subject<MessageEvent>().asObservable().pipe(
      map((event: MessageEvent) => {
        observer.next(event.data);
        return event;
      })
    ) as Subject<MessageEvent>;
  }
}
