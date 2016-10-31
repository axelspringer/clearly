// Importables
import { Directive } from '@angular/core';
import { forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { FormGroup } from '@angular/forms';

function validateFormGroup() {
  return (c: FormGroup) => {
    return Object.keys(c.controls).reduce((prev, curr, i) => {
      return !!c.controls[curr].value ? prev : ++prev;
    }, 0) > 2 ? { // this should be a adopted to a parameter
      valid: false,
    } : null;
  };
}

@Directive({
  selector: '[validateAtLeast][formGroup]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AtLeastValidatorDirective),
    multi: true,
  }],
})
export class AtLeastValidatorDirective {

  public validator: Function;

  constructor() {
    this.validator = validateFormGroup();
  }

  public validate(c: FormGroup) {
    return this.validator(c);
  }

}
