// Importables
import { Injectable } from '@angular/core';
import { IterableDiffer } from '@angular/core';
import { DefaultIterableDiffer } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

// Components
import { DFormElement } from './dform.element';

@Injectable()
export class DFormService {

  constructor() { }

  updateFormGroup(changes: DefaultIterableDiffer, form: FormGroup): FormGroup {

    // this is simple delete and replace in the form group
    changes.forEachAddedItem(change => {
      form.addControl(change.item.key, this.toFormControl(change.item));
    });
    changes.forEachRemovedItem(change => {
      form.removeControl(change.item.key);
    });

    return form;

  }

  toFormControl(el: DFormElement<any>) {

    return el.required ? // TODO@sdoell: pass along all validators
      new FormControl(el.value || '', Validators.required) :
      new FormControl(el.value || '');
  }


}
