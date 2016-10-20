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
import { ArticleActions } from '../article';

@Component({
  selector: 'channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss'
  ],
  templateUrl: './channelsDialog.component.html',
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
    // console.log(`'${this.constructor.name}' is init ...`);
    this.channels$ = this.store.let(getChannels())
      .distinctUntilChanged()
      .filter(channels => channels !== undefined)
      .map(channels => channels.map(channel => R.clone(channel)))
      .map(channels => this.channels = channels)
      .subscribe(channels => {
        this.form = new FormGroup(this.channels.reduce((prev, curr) => {
          prev[curr.name] =
            new FormControl({ value: 'n/a', disabled: curr.isMaster },
            [Validators.nullValidator]); return prev;
        }, {}));
      });
  }

  onSubmit(value) {
    this.store.dispatch(this.articleActions.updateChannels(this.channels));
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.channels$.unsubscribe();
    // console.log(`'${this.constructor.name}' is destroyed ...`);
  }

};
