// Importables
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApplicationRef } from '@angular/core';
import { FormArray } from '@angular/forms';

import * as _ from 'lodash';

// Components
import { DFormElement } from './dform.element';

// Directive
export class DFormAbstractComponent implements OnInit {

  public variants: FormArray;

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  constructor(
    public _appRef: ApplicationRef,
  ) {
    this.variants = new FormArray([]); // generate new form group
  }

  // angular

  public ngOnInit() {
    this.variants.push(this._newFormControl());
  }

  // public

  public setFormValue(value: any) {
    this.form.controls[this.element.key].setValue(value);
  }

  public addVariant() {
    this.variants.push(this._newFormControl());
  }

  // private

  private _newFormControl() {
    return new FormControl(); // save for later
  }

};
