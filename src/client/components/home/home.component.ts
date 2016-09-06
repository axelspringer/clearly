import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import {
  AppState,
  getUserState
} from '../../reducers';
import { UserActions } from '../../actions';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    UserActions
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html'
})
export class Home {

  private store$: any;
  private user$: any;
  private title$ = 'Home';

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

    console.log('hello `Home` component');
    this.title.setTitle(this.title$);

  }

  submitState(value) {

    console.log('submitState', value);
    this.store.dispatch(this.userActions.updateUser(this.user$));

  }

}
