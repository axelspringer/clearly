// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { IterableDiffers } from '@angular/core';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Subscription } from 'rxjs';

// Components
import { DFormService } from './dform.service';

@Component({
  selector: 'dform',
  templateUrl: './dform.component.html',
  providers: [
    DFormService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DFormComponent implements OnInit, OnDestroy {

  @Input('dform-data') data: Observable<any>;
  @Output('dform-update') update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public sup: Subscription;
  public differ: any;
  public form: FormGroup;

  constructor(
    private dform: DFormService,
    private differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
    this.form = new FormGroup({});
  }

  ngOnInit() {
    console.log(this.data);
    this.sup = this.data.subscribe(data => {
      let changes = this.differ.diff(data);
      if (changes) {
        this.form = this.dform.updateFormGroup(changes, this.form);
        this.update.emit(this.form);
      }
    });
  }

  ngOnDestroy() {
    this.sup.unsubscribe();
  }

};
