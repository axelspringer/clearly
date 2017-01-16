// vendor
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import * as _ from 'lodash';

// interfaces
import { IAppState } from '../app';

// custom
// import { fromArticleActions } from './article';
import { fromStore } from '../app';
// import * as fromCreatorActions from './creator.actions';



@Component({
  selector: 'sg-creator',  // <creator></creator>
  styleUrls: ['./creator.component.scss'],
  templateUrl: './creator.component.html',
})
export class CreatorComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public form$: any;

  constructor(
    private store: Store<IAppState>,
  ) {
  }

  // public

  public get selectedType(): Observable<any> {
    return this.store.select(fromStore.getCreatorSelected)
      .distinctUntilChanged()
      .skipWhile(selectedType => !!selectedType);
  }

  // public articleChannel(id: number): Observable<any> {
  //   return this.store
  //     .select(fromStore.getArticleChannel(id))
  //     .distinctUntilChanged()
  //     .filter(channel => !_.isUndefined(channel));
  // }

  // public get articleMaster(): Observable<any> {
  //   return this.store
  //     .select(fromStore.getArticleMaster)
  //     .distinctUntilChanged()
  //     .filter(master => !_.isUndefined(master));
  // }

  // angular

  public ngOnInit() {
    console.log(`Initializing 'Creator' ...`);

    // this.selectedType
    //   .subscribe(selectedType => {
    //     console.log(selectedType);
    //   })

    // this.store.dispatch(new fromCreatorActions.SelectTypeAction(0));
  }

  public ngOnDestroy() {
    // TODO(@sdoell): unsubscribe to all subscriptions
  }

};
