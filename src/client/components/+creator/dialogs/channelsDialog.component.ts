// Importables
import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// Composition
import { getChannels } from '../../app';

@Component({
  selector: 'channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss'
  ],
  templateUrl: './channelsDialog.component.html',
})
export class ChannelsDialog implements OnInit {

  public channels: Array<any> = [];

  constructor(
    public dialogRef: MdDialogRef<ChannelsDialog>,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {

    this.store.let(getChannels())
      .subscribe(channels => this.channels = channels);

  }

};
