// Importables
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { Observable } from 'rxjs';
import { AsyncSubject } from 'rxjs';

// Components
@Injectable()
export class Boot { // central service of a dynamic form

  private static defaultMessage: string = 'Bootstrapping';

  private message: BehaviorSubject<string> = new BehaviorSubject(Boot.defaultMessage);
  private bootSubject: AsyncSubject<boolean> = new AsyncSubject();

  constructor() {
    console.log(`Initializing 'BootService'`);
  }

  // public
  get message$() {
    return this.message.asObservable();
  }

  get init$() {
    setTimeout(() => {
      this.message.next('Ready');
      this.bootSubject.complete();
    }, 5000);
    return this.bootSubject.asObservable();
  }

}
