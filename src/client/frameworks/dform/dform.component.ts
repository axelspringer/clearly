// imports
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { IterableDiffer } from '@angular/core';
import { IterableDiffers } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Output } from '@angular/core';

// components
import { DFormProvider } from './dform.service';
import { DFormElement } from './dform.element';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DFormProvider],
  selector: 'sg-dform',
  templateUrl: './dform.component.html',
})
export class DFormComponent implements OnChanges {

  @Input() public data: Array<DFormElement<any>>; // maps to a channel, or something else
  @Output() public valueChanges: EventEmitter<any> = new EventEmitter<any>();

  public form = new FormGroup({});
  public differ: IterableDiffer = null;

  constructor(
    private differs: IterableDiffers,
    private dformProvider: DFormProvider,
  ) {
    this.differ = this.differs.find([]).create(null); // re-use existing changeDetector
  }

  // angular

  public ngOnChanges(changes: any) {
    const diff = this.differ.diff(changes['data'].currentValue);
    if (diff) { // if 'data' differs, render to FormGroup
      this.form = this.dformProvider.dformElementsToFormGroup(changes['data'].currentValue);
    }
  }

  // public

  public trackFormTypesByKey(index: number, element) {
    index = 0; // remove later
    return element.key;
  }

};
