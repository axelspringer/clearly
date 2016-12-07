// Importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

// Composition
import { ChannelsDialogComponent } from '../dialogs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-quick-access',
  styleUrls: ['./quickAccess.component.scss'],
  templateUrl: './quickAccess.component.html',
})
export class QuickAccessComponent {

  // public dialogRef: MdDialogRef<ChannelsDialogComponent>;
  public lastCloseResult: string;

  constructor(
    // private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  public toggleChannels() {
    // let config = new MdDialogConfig();
    // config.viewContainerRef = this.viewContainerRef;

    // this.dialogRef = this.dialog.open(ChannelsDialogComponent, config);

    // this.dialogRef.afterClosed().subscribe(result => {
    //   this.lastCloseResult = result;
    //   this.dialogRef = null;
    // });
  }

};
