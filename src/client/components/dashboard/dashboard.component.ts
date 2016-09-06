import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import {
  AppState,
  getUserState
} from '../../reducers';
import { UserActions } from '../../actions';


@Component({
  selector: 'dashboard',  // <dashboard></dashboard>
  providers: [
    UserActions
  ],
  styleUrls: [ './dashboard.style.css' ],
  templateUrl: './dashboard.template.html'
})
export class Dashboard {

  private store$: any;
  private user$: any;
  private title$ = 'Dashboard';
  private pirate$ = '';
  private isPirate$: boolean = false;

  // TypeScript public modifiers
  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private title: Title
  ) {

    // map app store slice
    this.store$ = this.store.let(getUserState())
      .distinctUntilChanged() // wait to real changes to the user
      .subscribe(state => {
        this.user$ = Object.assign({}, state);
      });

  }

  ngOnInit() {

    console.log('hello `Dashboard` component');
    this.title.setTitle(this.title$);

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
