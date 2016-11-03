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

// Components
import { CreatorService } from './creator.service';
import { EventEmitProvider } from '../../core';
import { ToolbarTitleUpdate } from '../toolbar';
import { ChannelsDialogComponent } from './dialogs';

@Component({
  selector: 'sg-creator',  // <creator></creator>
  styleUrls: [
    './creator.component.scss',
  ],
  templateUrl: './creator.component.html',
})
export class CreatorComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public dialogRef: MdDialogRef<ChannelsDialogComponent>;
  public lastCloseResult: string;

  public i18nTitle = 'ORCHESTRA.CREATOR.TITLE';
  public form$: any;

  constructor(
    private creatorService: CreatorService,
    private translate: TranslateService,

    private route: ActivatedRoute,

    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  public ngOnInit() {
    this.form$ = this.route.data
      .map(data => data['channels'])
      .switchMap(channels => {
        this.creatorService.channels = channels;
        console.log(channels);
        return this.creatorService.form;
      });

    this.translate.get(this.i18nTitle).subscribe(t =>
      EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(t));

    // this.toggleChannels();
  }

  public toggleChannels() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ChannelsDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
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
