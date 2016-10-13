import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class DFormElement<T> {

  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  disabled: boolean;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      disabled?: boolean
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.disabled = options.disabled || false;
    // by default do not disable, could be enabled later
  }

};

@Component({
  selector: 'dform-element',
  templateUrl: './dform.element.html'
})
export class DFormDynamicElement {

  @Input() element: DFormElement<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.element.key].valid;
  }

};
