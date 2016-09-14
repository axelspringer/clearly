import {
  Component,
  ViewChild,
  Inject,
  forwardRef,
  ApplicationRef,
  EventEmitter
} from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import {
  AppState,
  getUserState
} from '../../reducers';
import { UserActions } from '../../actions';
import { EventEmitterBus } from '../../commons';
import { ToolbarTitleUpdate } from '../toolbar';
import { DBService } from '../../services';

@Component({
  selector: 'dashboard',  // <dashboard></dashboard>
  providers: [
    UserActions
  ],
  styleUrls: ['./dashboard.style.css'],
  templateUrl: './dashboard.component.html'
})
export class Dashboard {

  private store$: any;
  private user$: any;
  private title$ = 'Übersicht';
  private pirate$ = '';
  private isPirate$: boolean = false;
  private test;

  // TypeScript public modifiers
  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private title: Title,
    private db: DBService
  ) {

    // map app store slice
    this.store$ = this.store.let(getUserState())
      .distinctUntilChanged() // wait to real changes to the user
      .subscribe(state => {
        this.user$ = Object.assign({}, state);
      });

    this.db.updates
      .map(u => {
        console.log('TEST', u);
        return `UPDATE: ${JSON.stringify(u)}`;
      })
      .subscribe(u => console.log(u));

  }

  ngOnInit() {
    console.log('hello `Dashboard` component');
    this.title.setTitle(this.title$);

    EventEmitterBus.get(ToolbarTitleUpdate.prototype.constructor.name).emit(this.title$);

    // this.db.allDocs()
    //   .subscribe(val => console.log(val));

  }

  isPirate(answer: boolean) {

    if (answer) {
      this.isPirate$ = answer;
      this.pirate$ = 'http://i.giphy.com/26tn1ToaMhpOEetkA.gif';
    }

  }

  submitState(value) {

    console.log('submitState', value);
    this.store.dispatch(this.userActions.updateUser(this.user$));

  }

}
