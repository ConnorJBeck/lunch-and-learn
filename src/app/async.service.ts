import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsyncService {

  constructor() { }

  wait(): void {
    const start = new Date().getTime();
    let end = start;
    while (end < start + 3000) {
      end = new Date().getTime();
    }
  }

  asyncFunctionWithCallback(value: number, callbackFunction: (value: string) => void): void {
    setTimeout(() => {
      console.log('Input: ' + value + ', Loading...');

      this.wait();

      callbackFunction('Finished!');
    });
  }

  asyncFunctionWithPromise(value: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Input: ' + value + ', Loading...');

        this.wait();

        if (value === 1) {
          resolve('Finished!');
        } else {
          reject('Bad input: ' + value);
        }
      });
    });
  }

  asyncFunctionWithObservable(value: number): Observable<string> {
    return new Observable((observer) => {
      setTimeout(() => {
        console.log('Input: ' + value + ', Loading...');

        this.wait();

        if (value === 1) {
          observer.next('Finished!');
          observer.complete();
        } else {
          observer.error('Bad input: ' + value);
        }
      });
    });
  }

  callback(value: any): void {
    console.log(value);
  }

  errorHandler(value: any): void {
    console.log(value);
  }
}
