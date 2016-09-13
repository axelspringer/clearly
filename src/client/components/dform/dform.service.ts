import {
  Injectable,
  IterableDiffer,
  DefaultIterableDiffer
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DFormElement } from './dform.element';

@Injectable()
export class DFormService {

  constructor() { }

  toFormGroup(elements: Array<any>) {

    let group = {};
    elements.forEach(el => {
      group[el.key] = this.toFormControl(el);
    });
    return new FormGroup(group);

  }

  diffFormGroup(changes: DefaultIterableDiffer, form: FormGroup) {

    // this is simple delete and replace in the form group
    changes.forEachAddedItem(change => {
      form.addControl(change.item.key, this.toFormControl(change.item));
    });
    changes.forEachRemovedItem(change => {
      form.removeControl(change.item.key);
    });

  }

  toFormControl(el: DFormElement<any>) {

    return el.required ? // TODO@sdoell: pass along all validators
      new FormControl(el.value || '', Validators.required) :
      new FormControl(el.value || '');
  }


}
