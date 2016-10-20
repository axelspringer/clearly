// Importables
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
import { Component } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogConfig } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import * as R from 'ramda';

// Components
import { CreatorService } from './creator.service';
import { EventEmitProvider } from '../../core';
import { ToolbarTitleUpdate } from '../toolbar';
import { ChannelsDialog } from './dialogs';

@Component({
  selector: 'creator',  // <creator></creator>
  styleUrls: [
    './creator.component.scss'
  ],
  templateUrl: './creator.component.html',
})
export class Creator implements OnInit, OnDestroy {

  form: FormGroup;

  public dialogRef: MdDialogRef<ChannelsDialog>;
  public lastCloseResult: string;

  public i18nTitle = 'ORCHESTRA.CREATOR.TITLE';
  public form$: any;

  constructor(
    private creatorService: CreatorService,
    private translate: TranslateService,

    private route: ActivatedRoute,

    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.form$ = this.route.data
      .map(data => data['channels'])
      .switchMap(channels => {
        this.creatorService.channels = channels;
        return this.creatorService.form;
      });

    this.translate.get(this.i18nTitle).subscribe(t =>
      EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(t));

    this.toggleChannels();
  }

  ngOnDestroy() {
    // should be unsubscribed
  }

  // addItem($event) {
  //   const item = this.creatorService.toDFormElement($event.dragData, {
  //     key: `${++this.elements - 1}`
  //   });
  //   this.store.dispatch(this.creatorActions.addItem(item));
  // }

  toggleChannels() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ChannelsDialog, config);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
