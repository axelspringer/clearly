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

@Injectable()
export class DForm { // central service of a dynamic form

  // what it does
  //
  // generates a form based on behaviors subject
  private __form: BehaviorSubject<FormGroup> = new BehaviorSubject(new FormGroup({}));
  private __formEntities: Array<DFormElement<any>>; // it is cached

  constructor() {
    console.log(`Initializing ${this.constructor.name} ...`);
  }

  // public

  // form entities
  public toForm$(DFormEntities: Array<DFormElement<any>> = []) {
    // set form entities to entities
    this.__formEntities = DFormEntities;
    // inject new form to BehaviorSubject
    this.__next(this.__formEntities);
    // return observable of subject
    return this.__form.asObservable();
  }

  // private

  private __DFormElementToFormGroup(formEntities: Array<DFormElement<any>>) {
    return formEntities.reduce((previousDFormEntity, currentDFormEntity) => {
      previousDFormEntity.addControl(
        currentDFormEntity.key,
        this.__DFormElementToFormControl(currentDFormEntity));
      return previousDFormEntity;
    }, new FormGroup({}));
  }

  private __next(formEntities: Array<DFormElement<any>>) {
    this.__form.next(this.__DFormElementToFormGroup(formEntities));
  }

  private __DFormElementToFormControl(DFormEntity: DFormElement<any>) {
    return DFormEntity.required
      ? new FormControl(DFormEntity.value || '', Validators.required)
      : new FormControl(DFormEntity.value || '');
  }

  public remove() {
    // const test = this._form.getValue();
    // test.removeControl('main');
    // console.log(test);
    this.__formEntities.splice(0, 1);
    // this._form.next(test);
  }

  // public toDForm(form: FormGroup, elements: Array<DFormElement<any>>) {
  //   elements.forEach(element => {
  //     form.addControl(element.key, this.toFormControl(element));
  //   });
  //   return form;
  // }

  public toFormElement(el) {
    // this is a bit spooky; will have small class
    return {
      'metaText': (options => new DFormMetaText(options)),
      'text': (options => new DFormText(options)),
      'textArea': (options => new DFormTextArea(options)),
    }[el];
  }

}
