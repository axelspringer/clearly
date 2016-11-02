// Importables
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

// Components
import { DFormElement } from './dform.element';
import { DFormMetaText } from './metaText';
import { DFormText } from './text';
import { DFormTextArea } from './textarea';

@Injectable()
export class DFormService {

  public toDForm(form: FormGroup, elements: Array<DFormElement<any>>) {
    elements.forEach(element => {
      form.addControl(element.key, this.toFormControl(element));
    });
    return form;
  }

  public toFormControl(el: DFormElement<any>) {
    return el.required
      ? new FormControl(el.value || '', Validators.required)
      : new FormControl(el.value || '');
  }

  public toFormElement(el) {
    // this is a bit spooky; will have small class
    return {
      'metaText': (options => new DFormMetaText(options)),
      'text': (options => new DFormText(options)),
      'textArea': (options => new DFormTextArea(options)),
    }[el];
  }

}
