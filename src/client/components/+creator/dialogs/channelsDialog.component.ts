// Importables
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';

// Composition
import { getChannels } from '../../app';
import { AppState } from '../../app';

@Component({
  selector: 'channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss'
  ],
  templateUrl: './channelsDialog.component.html',
})
export class ChannelsDialog implements OnInit, OnDestroy {

  public channels: Array<any> = [];
  public channelsForm: FormGroup;
  public channels$: Subscription;

  constructor(
    public dialogRef: MdDialogRef<ChannelsDialog>,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

    this.channelsForm = this.formBuilder.group({});
    this.channels$ = this.store.let(getChannels())
      .distinctUntilChanged()
      .filter(channels => channels !== undefined)
      .subscribe(channels => {
        const form = {};
        channels.forEach(channel => {
          form[channel.template.name] = ['', [Validators.nullValidator]];
        });
        this.channelsForm = this.formBuilder.group(form || {});
        this.channels = channels;
      });

  }

  onSubmit(value) {
    this.dialogRef.close(this.channels);
  }

  ngOnDestroy() {
    this.channels$.unsubscribe();
  }

};
