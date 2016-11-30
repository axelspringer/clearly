/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { forwardRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Inject } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';

export class DFormMainText extends DFormElement<string> {

  public controlType = 'mainText';
  public type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-maintext',
  templateUrl: './dform.mainText.html',
  styleUrls: ['./dform.mainText.scss'],
})

export class DFormMainTextComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
