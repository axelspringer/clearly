// Importables
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Components
import { DFormElement } from './dform.element';
import { DFormMetaText } from './metaText';
import { DFormText } from './text';
import { DFormTextArea } from './textarea';

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

  static formTypes = {
    'metaText': (options => new DFormMetaText(options)),
    'text': (options => new DFormText(options)),
    'textArea': (options => new DFormTextArea(options)),
  }

  private __form: BehaviorSubject<DFormObservable> = new BehaviorSubject(new DFormObservable());
  private __formEntities: Array<DFormElement<any>>; // it is cache

  constructor() {
    console.log(`Initializing ${this.constructor.name} ...`);
  }

  // public

  public get formTypes() {
    return Object.keys(DForm.formTypes);
  }

  // form entities
  public toForm$(DFormEntities: Array<DFormElement<any>> = []) {
    this.__formEntities = DFormEntities;
    this.__next(this.__formEntities);
    return this.__form.asObservable();
  }

  public addFormElement(afterFormEntity: DFormElement<any>) {
    this.__formEntities = this.__preserveFormState(this.__formEntities);
    this.__formEntities
      .splice(this.__formEntities.findIndex(formEntity => formEntity.key === afterFormEntity.key) + 1, 0, new DFormTextArea());
    this.__next(this.__formEntities);
  }

  public removeFormElement(oldFormEntity: DFormElement<any>) {
    this.__formEntities = this.__preserveFormState(this.__formEntities); // preserve state
    if (this.__formEntities.length > 1) { // prevent an empty entity
      this.__formEntities
        .splice(
        this.__formEntities.findIndex(formEntity => formEntity.key === oldFormEntity.key), 1);
      this.__next(this.__formEntities);
    }
  }

  public changeFormElement(changeFormEntity: DFormElement<any>, formType: string) {
    this.__formEntities[this.__formEntities.findIndex(formEntity => formEntity.key === changeFormEntity.key)] = this.newFormType(formType)();
    this.__next(this.__preserveFormState(this.__formEntities));
  }

  public newFormType(formType: string) {
    return DForm.formTypes[formType] || DForm.formTypes['text'];
  }

  // private

  private __DFormElementToFormGroup(formEntities: Array<DFormElement<any>>) {
    return formEntities.reduce((previousDFormEntity, currentDFormEntity) => {
      previousDFormEntity.addControl(currentDFormEntity.key, this.__DFormElementToFormControl(currentDFormEntity));
      return previousDFormEntity;
    }, new FormGroup({}));
  }

  private __DFormElementToFormControl(DFormEntity: DFormElement<any>) {
    return DFormEntity.required
      ? new FormControl(DFormEntity.value || '', Validators.required)
      : new FormControl(DFormEntity.value || '');
  }

  private __preserveFormState(formEntities: Array<DFormElement<any>>) {
    return formEntities.map(entity => {
      return Object.assign(entity, { value: this.__form.getValue().form.value[entity.key] });
    });
  }

  private __next(formEntities: Array<DFormElement<any>>) {
    this.__form.next(
      new DFormObservable(formEntities, this.__DFormElementToFormGroup(formEntities)),
    );
  }

}
