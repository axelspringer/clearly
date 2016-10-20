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
import { Observable } from 'rxjs';
import * as R from 'ramda';

// Composition
import { CreatorService } from '../creator.service';
import { DFormElement } from '../../dform';

@Component({
  selector: 'channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss'
  ],
  templateUrl: './channelsDialog.component.html',
})
export class ChannelsDialog implements OnInit, OnDestroy {

  public form = new FormGroup({});
  public channels = [];

  constructor(
    public dialogRef: MdDialogRef<ChannelsDialog>,
    public creatorService: CreatorService
  ) { }

  ngOnInit() {
    this.creatorService
      .form.subscribe(form => {
        this.channels = this.creatorService.channels;
        this.form = this.form = new FormGroup(this.channels.reduce((prev, curr) => {
          prev[curr.name] =
            new FormControl({ value: 'n/a', disabled: curr.isMaster },
              [Validators.nullValidator]); return prev;
        }, {}));
      });
  }

  onSubmit() {
    // this.store.dispatch(this.articleActions.updateChannels(this.channels));
    this.creatorService.filter(this.form.value);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    // this.channels$.unsubscribe();
    // console.log(`'${this.constructor.name}' is destroyed ...`);
  }

};
