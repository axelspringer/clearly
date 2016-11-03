// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ContentChildren } from '@angular/core';

// Components
import { DForm } from './dform.service';
import { DFormObservable } from './dform.service';
import { DFormElement } from './dform.element';
import { DFormTextArea } from './textarea/dform.textarea';

@Component({
  selector: 'sg-dform',
  templateUrl: './dform.component.html',
  providers: [DForm],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormComponent implements OnInit {

  @Input() public elements: Array<DFormElement<any>>;
  @Output() public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @ContentChildren(DFormTextArea) public comps: any;

  public dform: DFormObservable;

  constructor(
    private __DForm: DForm,
  ) {
  }

  public ngOnInit() {
    this.__DForm.toForm$(this.elements)
      .subscribe(form => {
        this.dform = form;
      });
  }

};
