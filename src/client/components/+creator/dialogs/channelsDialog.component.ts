// Importables
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

// Composition
import { CreatorService } from '../creator.service';

@Component({
  selector: 'sg-channels-dialog',
  styleUrls: [
    './channelsDialog.component.scss',
  ],
  templateUrl: './channelsDialog.component.html',
})
export class ChannelsDialogComponent implements OnInit, OnDestroy {

  public form = new FormGroup({});
  public channels = [];

  constructor(
    // public dialogRef: MdDialogRef<ChannelsDialogComponent>,
    public creatorService: CreatorService,
  ) { }

  public ngOnInit() {
    this.creatorService
      .form.subscribe(() => {
        this.channels = this.creatorService.channels;
        this.form = this.form = new FormGroup(this.channels.reduce((prev, curr) => {
          prev[curr.name] =
            new FormControl(
              { value: 'n/a', disabled: curr.isMaster },
              [Validators.nullValidator],
            );
          return prev;
        }, {}));
      });
  }

  public onSubmit() {
    // this.store.dispatch(this.articleActions.updateChannels(this.channels));
    // this.creatorService.filter(this.form.value);
    // this.dialogRef.close();
  }

  public ngOnDestroy() {
    // this.channels$.unsubscribe();
    // console.log(`'${this.constructor.name}' is destroyed ...`);
  }

};
