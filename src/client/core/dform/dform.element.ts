import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

export class DFormElement<T> {

  private static __generateKey () {
    return Math.random().toString(36).substr(2, 10);
  };

  public value: T;
  public key: string;
  public label: string;
  public required: boolean;
  public order: number;
  public controlType: string;
  public disabled: boolean;
  public fromMaster: boolean;
  public validators: Array<ValidatorFn>;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      disabled?: boolean,
      fromMaster?: boolean,
      validators?: Array<ValidatorFn>,
      isMaster?: boolean,
    } = {}) {
    this.value = options.value;
    this.key = options.key || DFormElement.__generateKey();
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.disabled = options.disabled || false;
    this.fromMaster = options.fromMaster || false;
    this.validators = options.validators || [];
    // by default do not disable, could be enabled later
  }

};

@Component({
  selector: 'sg-dform-element',
  templateUrl: './dform.element.html',
})
export class DFormDynamicElementComponent {

  @Input() public element: DFormElement<any>;
  @Input() public form: FormGroup;

  get isValid() {
    return this.form.controls[this.element.key].valid;
  }

};
