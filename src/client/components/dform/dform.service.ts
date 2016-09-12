import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Injectable()
export class DFormService {

  constructor() {}

  toFormGroup(elements: Array<any>) {

    let group = {};

    elements.forEach(el => {
      group[el.key] = el.required ?
        new FormControl(el.value || '', Validators.required) :
        new FormControl(el.value || '');
    });

    return new FormGroup(group);

  }

}
