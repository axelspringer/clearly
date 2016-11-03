// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { IterableDiffers } from '@angular/core';
import { IterableDiffer } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { DoCheck } from '@angular/core';

// Components
import { DForm } from './dform.service';
import { DFormObservable } from './dform.service';
import { DFormElement } from './dform.element';

@Component({
  selector: 'sg-dform',
  templateUrl: './dform.component.html',
  providers: [DForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormComponent implements OnInit, DoCheck {

  @Input() public elements: Array<DFormElement<any>>;
  @Output() public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public dform: DFormObservable;
  private __differ: IterableDiffer;

  constructor(
    private __DForm: DForm,
    private __differs: IterableDiffers,
  ) {
    // we can also re-use an existing changeDetector via:
    // this.differ = this.differs.find(items).create(this.changeDetector);
    // to keep track of changes
    this.__differ = __differs.find([]).create(null);
  }

  public ngDoCheck(): void {
    const changes = this.__differ.diff(this.elements);
    if (changes) {
      changes.forEachItem(item => {
        console.log(item);
      });
    }
  }

  public ngOnInit() {
    this.__DForm.toForm$(this.elements)
      .subscribe(form => {
        this.dform = form;
      });
  }

};
