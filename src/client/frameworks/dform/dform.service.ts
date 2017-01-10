/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DFormElement } from './dform.element';

@Injectable()
export class DFormProvider { // central service of a dynamic form

  constructor() {
    console.log(`Initializing ${this.constructor.name} ...`);
  }

  // public

  public dformElementsToFormGroup(formEntities: Array<DFormElement<any>>) {
    return formEntities.reduce((formGroup, formEntity) => {
      formGroup.addControl(formEntity.key, this.dFormElementToFormControl(formEntity)); // should be an option on the object
      return formGroup;
    }, new FormGroup({}));
  }

  public dFormElementToFormControl(formEntity: DFormElement<any>) {
    return new FormControl(formEntity.value || '', formEntity.validators);
  }

}
