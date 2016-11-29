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
import * as _ from 'lodash';

// Components
import { ArticleActions } from './article';
import { ChannelsDialogComponent } from './dialogs';
import { CreatorActions } from './creator.actions';
import { EventEmitProvider } from '../../core';
import { getSelectedType } from '../app';
import { IAppState } from '../app';
import { ToolbarTitleUpdate } from '../toolbar';

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

  public ngOnInit() {
    console.log(`Initializing 'Creator' ...`);

    this._store.let(getSelectedType())
      .distinctUntilChanged()
      .filter(selectedType => !_.isUndefined(selectedType))
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
