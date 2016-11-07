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

@Component({
  selector: 'sg-dform',
  templateUrl: './dform.component.html',
  providers: [DForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormComponent implements OnInit {

  @Input() public elements: Array<DFormElement<any>>;
  @Output() public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @ContentChildren(DFormElement, true) public test;
  @ViewChildren(DFormElement) public test2;

  public dform: DFormObservable;
  private __differ: IterableDiffer;

  constructor(
    private __DForm: DForm,
    private __differs: IterableDiffers,
    private elRef:ElementRef,
  ) {
    // re-use existing changeDetector
    this.__differ = __differs.find([]).create(null);
  }

  // // public ngDoCheck(): void {
  // //   console.log(this.test, this.test2);
  // //   console.log(this.test.changes);
  // //   const changes = this.__differ.diff(this.elements);
  // //   if (changes) {
  // //     changes.forEachItem(item => {
  // //       console.log(item);
  // //     });
  // //   }
  // // }

  // public ngAfterViewInit() {
  //   this.test2.changes.subscribe(() => console.log(this.test2));
  //   this.test.changes.subscribe(() => console.log(this.test));
  // }

  public ngOnInit() {
    this.__DForm.toForm$(this.elements) // map to input
      .subscribe(form => this.dform = form);
  }

};
