// Importables
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewEncapsulation } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogConfig } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

// Composition
import { ChannelsDialogComponent } from '../dialogs';
import { IAppState } from '../../app';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'my-quick-access',
  styleUrls: [
    './quickAccess.component.scss',
  ],
  templateUrl: './quickAccess.component.html',
})
export class QuickAccessComponent {

  public dialogRef: MdDialogRef<ChannelsDialogComponent>;
  public lastCloseResult: string;

  constructor(
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef,
    private store: Store<IAppState>,
  ) {
  }

  public toggleChannels() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ChannelsDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
  }

};
