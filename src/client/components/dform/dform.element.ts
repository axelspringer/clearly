import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class DFormElement<T> {

  public value: T;
  public key: string;
  public label: string;
  public required: boolean;
  public order: number;
  public controlType: string;
  public disabled: boolean;
  public fromMaster: boolean;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      disabled?: boolean,
      fromMaster?: boolean
      isMaster?: boolean,
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.disabled = options.disabled || false;
    this.fromMaster = options.fromMaster || false;
    // by default do not disable, could be enabled later
  }

};

@Component({
  selector: 'my-dform-element',
  templateUrl: './dform.element.html',
})
export class DFormDynamicElementComponent {

  @Input() public element: DFormElement<any>;
  @Input() public form: FormGroup;

  get isValid() {
    return this.form.controls[this.element.key].valid;
  }

};
