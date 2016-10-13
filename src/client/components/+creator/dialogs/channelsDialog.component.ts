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
import * as R from 'ramda';

// Composition
import { getChannels } from '../../app';
import { AppState } from '../../app';
import { ArticleActions } from '../../../actions';

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
  public form: FormGroup = new FormGroup({});
  public channels$: Subscription;

  constructor(
    public dialogRef: MdDialogRef<ChannelsDialog>,
    private store: Store<AppState>,
    private articleActions: ArticleActions
  ) {}

  ngOnInit() {
    this.channels$ = this.store.let(getChannels())
      .distinctUntilChanged()
      .filter(channels => channels !== undefined)
      .map(channels => channels.map(channel => R.clone(channel)))
      .subscribe(channels => {
        this.channels = channels;
        this.form = new FormGroup({});
        this.channels.forEach(channel => {
          this.form.addControl(channel.name,
            new FormControl({}, [Validators.nullValidator]));
        });
      });
  }

  onSubmit(value) {
    this.store.dispatch(this.articleActions.updateChannels(this.channels));
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.channels$.unsubscribe();
  }

};
