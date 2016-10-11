// Importables
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

// Composition
import { getChannels } from '../../app';
import { AppState } from '../../app';
import { ChannelsActions } from '../../../actions';

@Component({
  selector: 'channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss'
  ],
  templateUrl: './channelsDialog.component.html',
  providers: [

  ]
})
export class ChannelsDialog implements OnInit, OnDestroy {

  public channels: Array<any> = [];
  public form: FormGroup;
  public channels$: Subscription;

  constructor(
    public dialogRef: MdDialogRef<ChannelsDialog>,
    private store: Store<AppState>,
    private channelsActions: ChannelsActions
  ) {

    this.form = new FormGroup({});

  }

  ngOnInit() {

    this.channels$ = this.store.let(getChannels())
      .distinctUntilChanged()
      .filter(channels => channels !== undefined)
      .subscribe(channels => {
        this.channels = channels.map(channel => JSON.parse(JSON.stringify(channel))); // that is not nice
        this.form = new FormGroup({});
        this.channels.forEach(channel => {
          this.form.addControl(channel.template.name,
            new FormControl(channel, [Validators.nullValidator]));
        });
      });
  }

  onSubmit(value) {
    this.store.dispatch(this.channelsActions.updateChannels(this.channels));
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.channels$.unsubscribe();
  }

};
