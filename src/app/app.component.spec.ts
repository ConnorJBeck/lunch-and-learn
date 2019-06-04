import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AsyncService} from './async.service';
import {of, throwError} from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let asyncService: AsyncService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    asyncService = TestBed.get(AsyncService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`onClickSyncWithPromise should sync return promise`, async () => {
    const asyncPromise = Promise.resolve('Excellent');

    spyOn(asyncService, 'asyncFunctionWithPromise').and.returnValue(asyncPromise);
    spyOn(asyncService, 'callback');

    const value = await component.onClickSyncWithPromise();

    expect(asyncService.callback).toHaveBeenCalledWith(value);
  });

  it(`onClickAsyncWithPromise should async return value`, fakeAsync(() => {
    const promise = Promise.resolve('Excellent');

    spyOn(asyncService, 'asyncFunctionWithPromise').and.returnValue(promise);
    spyOn(asyncService, 'callback');

    component.onClickAsyncWithPromise();

    tick();

    expect(asyncService.callback).toHaveBeenCalledWith('Excellent');
  }));

  it(`onClickAsyncWithObservable should async return value`, fakeAsync(() => {
    const observable = of('Excellent');

    spyOn(asyncService, 'asyncFunctionWithObservable').and.returnValue(observable);
    spyOn(asyncService, 'callback');

    component.onClickAsyncWithObservable();

    tick();

    expect(asyncService.callback).toHaveBeenCalledWith('Excellent');
  }));

  it(`onClickAsyncWithObservableError should async handle thrown error`, fakeAsync(() => {
    const observable = throwError('error');

    spyOn(asyncService, 'asyncFunctionWithObservable').and.returnValue(observable);
    spyOn(asyncService, 'callback');
    spyOn(asyncService, 'errorHandler');

    component.onClickAsyncWithObservableError();

    tick();

    expect(asyncService.errorHandler).toHaveBeenCalledWith('error');
    expect(asyncService.callback).not.toHaveBeenCalled();
  }));

  it(`onClickAsyncWithPromiseError should async handle thrown error`, fakeAsync(() => {
    const promise = Promise.reject('error');

    spyOn(asyncService, 'asyncFunctionWithPromise').and.returnValue(promise);
    spyOn(asyncService, 'callback');
    spyOn(asyncService, 'errorHandler');

    component.onClickAsyncWithPromiseError();

    tick();

    expect(asyncService.errorHandler).toHaveBeenCalledWith('error');
    expect(asyncService.callback).not.toHaveBeenCalled();
  }));

  it(`onClickAsyncWithPromise should throw async error`, fakeAsync(() => {
    const promise = Promise.reject('error');

    spyOn(asyncService, 'asyncFunctionWithPromise').and.returnValue(promise);
    spyOn(asyncService, 'callback');

    try {
      component.onClickAsyncWithPromise();
      tick();
    } catch (error) {
      expect(error.rejection).toEqual('error');
      expect(asyncService.callback).not.toHaveBeenCalled();
    }
  }));

  it(`onClickSyncWithPromise should throw async error`, async (done) => {
    const promise = Promise.reject('error');

    spyOn(asyncService, 'asyncFunctionWithPromise').and.returnValue(promise);
    spyOn(asyncService, 'callback');

    try {
      await component.onClickSyncWithPromise();
      fail();
    } catch (error) {
      expect(error).toEqual('error');
      expect(asyncService.callback).not.toHaveBeenCalled();
      done();
    }
  });
});
