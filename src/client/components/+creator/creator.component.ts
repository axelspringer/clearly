// Importables
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Component } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogConfig } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

// Components
import { ArticleActions } from './article';
import { ChannelsDialogComponent } from './dialogs';
import { CreatorActions } from './creator.actions';
import { EventEmitProvider } from '../../core';
import { getCreatorSelectedType } from '../app';
import { IAppState } from '../app';
import { ToolbarTitleUpdate } from '../toolbar';
import { getArticleChannel } from '../app';
import { getArticleMaster } from '../app';

@Component({
  selector: 'sg-creator',  // <creator></creator>
  styleUrls: ['./creator.component.scss'],
  templateUrl: './creator.component.html',
})
export class CreatorComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public dialogRef: MdDialogRef<ChannelsDialogComponent>;
  public lastCloseResult: string;

  public i18nTitle = 'ORCHESTRA.CREATOR.TITLE';
  public form$: any;

  constructor(
    public dialog: MdDialog,

    private _store: Store<IAppState>,
    private _articleActions: ArticleActions,
    private _creatorActions: CreatorActions,
    private _translate: TranslateService,
    private _viewContainerRef: ViewContainerRef,
  ) {
  }

  // public

  public get selectedType(): Observable<any> {
    return this._store.let(getCreatorSelectedType())
      .distinctUntilChanged()
      .filter(selectedType => !_.isUndefined(selectedType));
  }

  public articleChannel(id: number): Observable<any> {
    return Observable.combineLatest(
      this._store.let(getArticleChannel(id)),
    );
  }

  public get articleMaster(): Observable<any> {
    return Observable.combineLatest(
      this._store.let(getArticleMaster()),
    );
  }

  // angular

  public ngOnInit() {
    console.log(`Initializing 'Creator' ...`);

    this.selectedType
      .subscribe(selectedType => {
        this._store.dispatch(this._articleActions.updateArticle(selectedType));
      });

    this._store.dispatch(this._creatorActions.selectType(0));

    this._translate.get(this.i18nTitle).subscribe(t =>
      EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(t));
  }

  public toggleChannels() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this._viewContainerRef;
    this.dialogRef = this.dialog.open(ChannelsDialogComponent, config);
    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
  }

  public ngOnDestroy() {
    // should be unsubscribed
  }

  public onFormUpdate($event) {
    this.form = $event;

    // update to dispatch
    // this.store.dispatch(this.creatorActions.update($event.value));

  }

};
