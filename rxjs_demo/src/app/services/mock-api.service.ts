import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  amount: number;
}

export interface Task {
  id: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class MockApiService {
  getUser(id: number) {
    const user: User = { id, name: `User ${id}` };
    return of(user).pipe(delay(this.randomDelay(300, 900)));
  }

  getOrdersForUser(userId: number) {
    const orders: Order[] = [
      { id: userId * 10 + 1, amount: 120 },
      { id: userId * 10 + 2, amount: 75 }
    ];
    return of(orders).pipe(delay(this.randomDelay(400, 1000)));
  }

  getStats() {
    return of({ visitors: 1200, active: 87 }).pipe(delay(500));
  }

  saveTask(title: string) {
    const task: Task = { id: Date.now(), title };
    return of(task).pipe(delay(600));
  }

  getOrder(orderId: number) {
    return of({ id: orderId, status: 'ready' }).pipe(
      delay(this.randomDelay(300, 1100))
    );
  }

  login() {
    return of({ token: 'demo-token', at: new Date().toISOString() }).pipe(
      delay(1000)
    );
  }

  getFailingCall() {
    return throwError(() => new Error('Server error')).pipe(delay(400));
  }

  private randomDelay(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
