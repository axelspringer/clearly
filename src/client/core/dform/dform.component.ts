// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { IterableDiffer } from '@angular/core';
import { IterableDiffers } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

// Components
import { DForm } from './dform.service';
import { DFormElement } from './dform.element';
import { DFormObservable } from './dform.service';
import { Event } from '../events';
import { EventEmitProvider } from '../events';

// Interface
export class DFormComponentFocus extends Event {
  constructor(payload: any = {}) {
    super(payload);
  }
}

@Component({
  selector: 'sg-dform',
  templateUrl: './dform.component.html',
  providers: [DForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormComponent implements OnInit {

  @Input() public elements: Array<DFormElement<any>>;
  @Output() public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public dform: DFormObservable;
  private __DFormDiffer: IterableDiffer;

  constructor(
    private __DForm: DForm,
    private __differs: IterableDiffers,
  ) {
    // re-use existing changeDetector
    this.__DFormDiffer = this.__differs.find([]).create(null);
  }

  // public

  public ngOnInit(): void {
    this.__DForm.toForm$(this.elements) // map to input
      .subscribe(form => {
        this.dform = form;
        const changes = this.__trackDFormChanges(this.dform);
        if (changes) {
          changes.forEachOperation(diff => {
            window.setTimeout(() => {
              EventEmitProvider
                .connect(DFormComponentFocus.prototype.constructor.name)
                .emit(
                  !diff.previousIndex
                    ? diff.item.key
                    : changes.collection[diff.previousIndex - 1].key,
                );
            });
          });
        }
      });
  }

  // private

  private __trackDFormChanges(dform: DFormObservable) {
    return this.__DFormDiffer.diff(dform.data);
  }

};
