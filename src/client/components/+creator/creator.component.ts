// Importables
import { ActivatedRoute } from '@angular/router';
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
import { CreatorService } from './creator.service';
import { EventEmitProvider } from '../../core';
import { ToolbarTitleUpdate } from '../toolbar';
import { ChannelsDialogComponent } from './dialogs';
import { IAppState } from '../app';
import { ArticleActions } from './article';

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
    private _creatorService: CreatorService,
    private _articleActions: ArticleActions,
    private _route: ActivatedRoute,
    private _translate: TranslateService,
    private _viewContainerRef: ViewContainerRef,
  ) {
  }

  public ngOnInit() {
    console.log(`Initializing 'Creator' ...`);

    this._store.dispatch(this._articleActions.updateArticle());

    this._route.data // we use first
      .map(data => data['types']) // switch to a new observable
      .switchMap(types => {
        const articleType = _.first(types);
        this._creatorService.channels = articleType['channels']; // shoule be type
        this._creatorService.contexts = articleType['contexts']
        return this._creatorService.form;
      });

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
