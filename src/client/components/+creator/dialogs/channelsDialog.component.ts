import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss'
  ],
  templateUrl: './channelsDialog.component.html',
})
export class ChannelsDialog implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<ChannelsDialog>,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {



  }

};
