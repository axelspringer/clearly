/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Components
import { DFormAbstractText } from './abstract';
import { DFormDropDown } from './dropDown';
import { DFormElement } from './dform.element';
import { DFormMainText } from './mainText';
import { DFormMetaText } from './metaText';
import { DFormSocialVideo } from './socialVideo';
import { DFormText } from './text';
import { DFormTextArea } from './textArea';

interface IDFormSubject {
  data: Array<DFormElement<any>>;
  form: FormGroup;
}

export class DFormObservable implements IDFormSubject {
  constructor(
    public data: Array<DFormElement<any>> = [],
    public form: FormGroup = new FormGroup({}),
  ) {
  }
}

@Injectable()
export class DForm { // central service of a dynamic form

  public static formTypes = {
    'metaText': (options => new DFormMetaText(options)),
    'text': (options => new DFormText(options)),
    'textArea': (options => new DFormTextArea(options)),
    'socialVideo': (options => new DFormSocialVideo(options)),
    'dropDown': (options => new DFormDropDown(options)),
    'mainText': (options => new DFormMainText(options)),
    'abstract': (options => new DFormAbstractText(options)),
  };

  private __form: BehaviorSubject<DFormObservable> = new BehaviorSubject(new DFormObservable());
  private __formEntities: Array<DFormElement<any>>; // it is cache

  constructor() {
    console.log(`Initializing ${this.constructor.name} ...`);
  }

  // public

  // form entities
  public toForm$(DFormEntities: Array<DFormElement<any>> = []) {
    this.__formEntities = DFormEntities;
    this.next(this.__formEntities);
    return this.__form.asObservable();
  }

  public dFormElementToFormGroup(formEntities: Array<DFormElement<any>>) {
    return formEntities.reduce((previousDFormEntity, currentDFormEntity) => {
      previousDFormEntity.addControl(currentDFormEntity.key, this.dFormElementToFormControl(currentDFormEntity));
      return previousDFormEntity;
    }, new FormGroup({}));
  }

  public next(formEntities: Array<DFormElement<any>>) {
    this.__form.next(new DFormObservable(formEntities, this.dFormElementToFormGroup(formEntities)));
  }

  public dFormElementToFormControl(DFormEntity: DFormElement<any>) {
    return new FormControl(DFormEntity.value || '', DFormEntity.validators);
  }

  // private

  public newFormType(newFormType?: string) {
    return DForm.formTypes[newFormType] || DForm.formTypes['mainText'];
  }

  public get formTypes() {
    return Object.keys(DForm.formTypes);
  }

  // private __preserveFormState(formEntities: Array<DFormElement<any>>) {
  //   return formEntities.map(entity => {
  //     return Object.assign(entity, { value: this.__form.getValue().form.value[entity.key] });
  //   });
  // }

}
