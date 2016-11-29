/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DFormElement } from './dform.element';

@Injectable()
export class DFormService { // central service of a dynamic form

  // private __form: BehaviorSubject<DFormObservable> = new BehaviorSubject();
  // private __formEntities: Array<DFormElement<any>>; // it is cache

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
