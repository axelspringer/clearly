// Importables
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
import { Component } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogConfig } from '@angular/material';
import { MdDialogRef } from '@angular/material';

// Components
import { AppState } from '../app';
import { CreatorActions } from './creator.actions';
import { ArticleActions } from '../../actions';
import { CreatorService } from './creator.service';
import { DFormElement } from '../dform';
import { DFormText } from '../dform';
import { EventEmitProvider } from '../../core';
import { getCreatorItems } from '../app';
import { ToolbarTitleUpdate } from '../toolbar';
import { getChannels } from '../app';
import { ChannelsDialog } from './dialogs';

@Component({
  selector: 'creator',  // <creator></creator>
  providers: [
    CreatorService,
    CreatorActions,
    ArticleActions,
  ],
  styleUrls: [
    './creator.component.scss'
  ],
  templateUrl: './creator.component.html',
})
export class Creator implements OnInit, OnDestroy {

  form: FormGroup;

  public dialogRef: MdDialogRef<ChannelsDialog>;
  public lastCloseResult: string;

  public elements: number = 0;
  public i18nTitle = 'ORCHESTRA.CREATOR.TITLE';
  public creatorStore$: any;
  public articleStore$: any;
  public form$: any;

  constructor(
    private creatorService: CreatorService,

    private creatorActions: CreatorActions,
    private articleActions: ArticleActions,
    private store: Store<AppState>,
    private translate: TranslateService,

    private router: Router,
    private route: ActivatedRoute,

    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.creatorStore$ = this.store.let(getCreatorItems());
    this.articleStore$ = this.store.let(getChannels());

    this.form$ = this.creatorService.form$; // mapt nicely to dom

    // this.route.data.subscribe(data => this.channels = data.channels);

    this.store.dispatch(this.articleActions.load());

    // pre publish model with title
    const item = this.creatorService.toDFormElement('text', {
      key: `${++this.elements - 1}`
    });
    this.store.dispatch(this.creatorActions.addItem(item));

    this.translate.get(this.i18nTitle).subscribe(t =>
      EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(t));

    this.toggleChannels();

  }

  ngOnDestroy() {
    // should be unsubscribed
  }

  addItem($event) {
    const item = this.creatorService.toDFormElement($event.dragData, {
      key: `${++this.elements - 1}`
    });
    this.store.dispatch(this.creatorActions.addItem(item));
  }

  toggleChannels() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ChannelsDialog, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
  }

  onFormUpdate($event) {
    this.form = $event;

    // update to dispatch
    // this.store.dispatch(this.creatorActions.update($event.value));

  }



};
