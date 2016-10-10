import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss'
  ],
  templateUrl: './channelsDialog.component.html',
})
export class ChannelsDialog {
  constructor(public dialogRef: MdDialogRef<ChannelsDialog>) { }
};
