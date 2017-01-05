// imports
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

// interfaces
import { IAppState } from '../app';

// components
import { ArticleActions } from './article';
import { EventEmitProvider } from '../../frameworks/core';
import * as fromCreatorActions from './creator.actions';
import { fromStore } from '../app';
import { getArticleChannel } from '../app';
import { getArticleMaster } from '../app';
import { StatusTitleUpdate } from '../status/status.component';

@Component({
  selector: 'sg-creator',  // <creator></creator>
  styleUrls: ['./creator.component.scss'],
  templateUrl: './creator.component.html',
})
export class CreatorComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public i18nTitle = 'COMPONENT.CREATOR.TITLE';
  public form$: any;

  public icons = 'fa-user';

  constructor(
    // public dialog: MdDialog,

    private _store: Store<IAppState>,
    private _articleActions: ArticleActions,
    private _translate: TranslateService,
  ) {
  }

  // public

  public get selectedType(): Observable<any> {
    return this._store.select(fromStore.getCreatorSelected)
      .distinctUntilChanged()
      .filter(selectedType => !_.isUndefined(selectedType));
  }

  public articleChannel(id: number): Observable<any> {
    return this._store
      .let(getArticleChannel(id))
      .distinctUntilChanged()
      .filter(channel => !_.isUndefined(channel));
  }

  public get articleMaster(): Observable<any> {
    return this._store
      .let(getArticleMaster())
      .distinctUntilChanged()
      .filter(master => !_.isUndefined(master));
  }

  // angular

  public ngOnInit() {
    console.log(`Initializing 'Creator' ...`);

    this.selectedType
      .subscribe(selectedType => {
        this._store.dispatch(this._articleActions.updateArticle(selectedType));
      });

    this._store.dispatch(new fromCreatorActions.SelectTypeAction(0));

    this._translate.get(this.i18nTitle).subscribe(translation => {
      EventEmitProvider.connect(StatusTitleUpdate.prototype.constructor.name).emit(translation);
    });
  }

  public ngOnDestroy() {
    // TODO(@sdoell): unsubscribe to all subscriptions
  }

};
