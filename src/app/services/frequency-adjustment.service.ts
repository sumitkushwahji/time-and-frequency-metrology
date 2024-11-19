// To share real-time data between two components in an Angular application, you can use a shared service with an RxJS Subject or BehaviorSubject to facilitate communication. This approach will enable one component to send data while others can subscribe to receive and react to it.

// tic-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrequencyAdjustmentService {
  private ticValueSubject = new BehaviorSubject<any>(null);
  ticValue$ = this.ticValueSubject.asObservable();

  sendTicValue(data: any) {
    this.ticValueSubject.next(data);
  }
}
