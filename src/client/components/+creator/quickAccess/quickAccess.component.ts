// Importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewEncapsulation } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogConfig } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

// Composition
import { ChannelsDialog } from '../dialogs';
import { AppState } from '../../app';
import { ChannelsActions } from '../../../actions';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'quick-access',
  styleUrls: [
    './quickAccess.component.scss'
  ],
  providers: [
    ChannelsActions,
  ],
  templateUrl: './quickAccess.component.html'
})
export class QuickAccess implements OnInit {

  public dialogRef: MdDialogRef<ChannelsDialog>;
  public lastCloseResult: string;

  constructor(
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef,
    private store: Store<AppState>,
    private channelsActions: ChannelsActions
  ) {
  }

  ngOnInit() {

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

};
