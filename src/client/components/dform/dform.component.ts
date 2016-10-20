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
import { DFormElement } from './dform.element';

@Component({
  selector: 'dform',
  templateUrl: './dform.component.html',
  providers: [
    DFormService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DFormComponent implements OnInit, OnDestroy {

  @Input() elements: Array<DFormElement<any>>;
  @Output() update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor(
    private dFormService: DFormService
  ) {
  }

  ngOnInit() {
    this.form = this.dFormService.toDForm(new FormGroup({}), this.elements);
  }

  ngOnDestroy() {
    // this.sup.unsubscribe();
  }

};
