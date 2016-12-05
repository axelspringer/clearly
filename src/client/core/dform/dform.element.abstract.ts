// Importables
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import * as _ from 'lodash';

// Components
import { DFormElement } from './dform.element';

// Directive
export class DFormAbstractComponent implements OnInit {

  public variants: FormArray;

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  constructor() {
    this.variants = new FormArray([]); // generate new form group
  }

  // angular

  public ngOnInit() {
    if (!this.element.channel || _.includes(this.element.channels, this.element.channel)) {
      this.variants.push(this._newFormControl());
    }
  }

  // public

  public setFormValue(value: any) {
    this.form.controls[this.element.key].setValue(value);
  }

  public addVariant() {
    this.variants.push(this._newFormControl());
  }

  public isFaved(event) {
    event -= 1;
    _.forEach(this.variants.controls, (variant, index) => {
      variant.setValue({
        isFav: event === index ? !variant.value.isFav : false,
        value: '',
      });
    });
  }

  public removeVariant(index) {
    if (this.variants.controls.length > 1) {
      index -= 1;
      this.variants.removeAt(index);
    }
  }

  // private

  private _newFormControl() {
    return new FormControl(); // save for later
  }

};
