// Importables
import { Component } from '@angular/core';
import { Inject } from 'angular/core';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

// Components
import { EventEmitProvider } from '../../core';
import { ToolbarTitleUpdate } from '../toolbar';
import { DocsActions } from '../../actions';
import { AppState } from '../app';
import { getDocs } from '../app';

@Component({
  selector: 'dashboard',  // <dashboard></dashboard>
  styleUrls: ['./dashboard.style.css'],
  templateUrl: './dashboard.component.html'
})
export class Dashboard {

  private store$: any;
  private user$: any;
  private title$ = 'Übersicht';
  private pirate$ = '';
  private isPirate$: boolean = false;

  private articles$: Observable<any>;
  private actions: Actions;

  // TypeScript public modifiers
  constructor(
    private store: Store<AppState>,
    private title: Title,
    private docsActions: DocsActions
  ) {

    // map app store slice
    // this.store$ = this.store.let(getUserState())
    //   .distinctUntilChanged() // wait to real changes to the user
    //   .subscribe(state => {
    //     this.user$ = Object.assign({}, state);
    //   });

    this.articles$ = this.store.let(getDocs());
    this.store.dispatch(this.docsActions.load());
    setTimeout(() => {
      this.store.dispatch(this.docsActions.load());
    }, 2500);

  }

  ngOnInit() {
    console.log('hello `Dashboard` component');
    this.title.setTitle(this.title$);

    EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(this.title$);

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
