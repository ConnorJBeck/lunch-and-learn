import {Component} from '@angular/core';
import {AsyncService} from './async.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Async Lunch And Learn';

  constructor(private asyncService: AsyncService) {

  }




  // Sync
  onClickSync(): void {
    const value: string = this.syncFunction(1);

    this.asyncService.callback(value);

    console.log('End function.');
  }

  syncFunction(value: any): string {
    console.log('Input: ' + value + ', Loading...');

    this.asyncService.wait();

    return 'Finished!';
  }






  // Async with callback
  onClickAsyncWithCallback(): void {
    this.asyncService.asyncFunctionWithCallback(1, this.asyncService.callback);

    console.log('End function');
  }

  // Async with promise
  onClickAsyncWithPromise(): void {
    this.asyncService.asyncFunctionWithPromise(1)
      .then((value) => this.asyncService.callback(value));

    console.log('End function');
  }

  // Sync with promise
  async onClickSyncWithPromise(): Promise<string> {
    const value = await this.asyncService.asyncFunctionWithPromise(1);

    this.asyncService.callback(value);

    console.log('End function');

    return value;
  }

  // Async with observable
  onClickAsyncWithObservable(): void {
    this.asyncService.asyncFunctionWithObservable(1)
      .subscribe((value) => this.asyncService.callback(value));

    console.log('End function');
  }

  // Sync with observable
  async onClickSyncWithObservable(): Promise<string> {
    const value: string = await this.asyncService.asyncFunctionWithObservable(1).toPromise();

    this.asyncService.callback(value);

    console.log('End function');

    return value;
  }




  // ERROR



  // Async with promise
  onClickAsyncWithPromiseError(): void {
    this.asyncService.asyncFunctionWithPromise(2)
      .then((value) => this.asyncService.callback(value))
      .catch((reason: any) => this.asyncService.errorHandler(reason));

    console.log('End function');
  }

  // Sync with promise
  async onClickSyncWithPromiseError(): Promise<void> {
    try {
      const value = await this.asyncService.asyncFunctionWithPromise(2);

      this.asyncService.callback(value);

      console.log('End function');
    } catch (reason) {
      this.asyncService.errorHandler(reason);
    }
  }

  // Async with observable
  onClickAsyncWithObservableError(): void {
    this.asyncService.asyncFunctionWithObservable(2)
      .subscribe({
        next: (value) => this.asyncService.callback(value),
        error: (reason) => this.asyncService.errorHandler(reason)
      });

    console.log('End function');
  }

  // Sync with observable
  async onClickSyncWithObservableError(): Promise<void> {
    try {
      const value: string = await this.asyncService.asyncFunctionWithObservable(2).toPromise();

      this.asyncService.callback(value);

      console.log('End function');
    } catch (reason) {
      this.asyncService.errorHandler('Error: ' + reason);
    }
  }


  // HELPER METHODS


}
