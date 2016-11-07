// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { DoCheck } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { IterableDiffer } from '@angular/core';
import { IterableDiffers } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { ElementRef } from '@angular/core';

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
  private __differ: IterableDiffer;

  constructor(
    private __DForm: DForm,
    private __differs: IterableDiffers,
    private __elRef: ElementRef,
  ) {
    // re-use existing changeDetector
    this.__differ = __differs.find([]).create(null);
  }

  public ngOnInit() {
    this.__DForm.toForm$(this.elements) // map to input
      .subscribe(form => {
        this.dform = form;
        const changes = this.__differ.diff(this.dform.data);
        if (changes) {
          changes.forEachAddedItem(diff => {
            window.setTimeout(() => {
              EventEmitProvider
                .connect(DFormComponentFocus.prototype.constructor.name)
                .emit(diff.item.key)
            });
          });
        }
      });
    // this.test2.changes.subscribe(changes => console.log(changes));
  }

};
