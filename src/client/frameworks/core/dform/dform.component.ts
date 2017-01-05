/* tslint:disable:max-line-length */
// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { IterableDiffer } from '@angular/core';
import { IterableDiffers } from '@angular/core';
import { Output } from '@angular/core';
import { OnChanges } from '@angular/core';

// Components
import { DFormService } from './dform.service';
import { DFormElement } from './dform.element';

@Component({
  selector: 'sg-dform',
  templateUrl: './dform.component.html',
  providers: [DFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormComponent implements OnChanges {

  @Input() public data: Array<DFormElement<any>>; // maps to a channel, or something else
  @Output() public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form = new FormGroup({});

  private _dataDiffer: IterableDiffer;

  constructor(
    private _differs: IterableDiffers,
    private _dformService: DFormService,
  ) {
    this._dataDiffer = this._differs.find([]).create(null); // re-use existing changeDetector
  }

  // angular

  public ngOnChanges(changes: any) {
    const differs = this._dataDiffer.diff(changes['data'].currentValue);
    if (differs) { // if 'data' differs, render to FormGroup
      this.form = this._dformService.dformElementsToFormGroup(changes['data'].currentValue);
    }
  }

  // public

  public trackFormTypesByKey(index: number, element) {
    index = 0; // remove later
    return element.key;
  }

  // public addFormElement(afterFormEntity: DFormElement<any>, newFormType?: string) {
  //   const el = this.dForm.data.findIndex(formEntity => formEntity.key === afterFormEntity.key) + 1;
  //   if (el !== -1) {
  //     this.dForm.data.splice(el, 0, this.__dForm.newFormType(newFormType)());
  //     this.dForm.form.addControl(this.dForm.data[el].key, this.__dForm.dFormElementToFormControl(this.dForm.data[el]));
  //   }
  // }

  // public removeFormElement(oldFormEntity: DFormElement<any>) {
  //   if (this.dForm.data.length > 1) {
  //     this.dForm.data.splice(this.dForm.data.findIndex(formEntity => formEntity.key === oldFormEntity.key), 1);
  //   }
  // }

  // public changeFormElementType(changeFormEntity: DFormElement<any>, newFormType: string) {
  //   const el = this.dForm.data.findIndex(formEntity => formEntity.key === changeFormEntity.key);
  //   if (el !== -1) {
  //     this.dForm.data[el] = this.__dForm.newFormType(newFormType)();
  //     this.dForm.form.setControl(this.dForm.data[el].key, this.__dForm.dFormElementToFormControl(this.dForm.data[el]));
  //   }
  // }

  // // private

  // private __trackDFormChanges(dform: DFormObservable) {
  //   return this.__dFormDiffer.diff(dform.data);
  // }

};
