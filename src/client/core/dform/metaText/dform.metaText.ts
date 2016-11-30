/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';
import { IDFormElementOptions } from '../dform.element';
import { DFormAbstractComponent } from '../dform.element.abstract';

export class DFormMetaText extends DFormElement<string> {

  public controlType = 'metaText';
  public type: string;
  public placeholder: string;
  public hint: string;

  constructor(options: {} = {}) {
    super(options as IDFormElementOptions<any>);
    this.type = options['type'] || '';
    this.placeholder = options['placeholder'] || '';
    this.hint = options['hint'] || '';
  }

};

const metaData = Object.assign({ // we patch metaData, have to wait for next release of Angular
  selector: 'sg-dform-meta-text',
  templateUrl: './dform.metaText.html',
  styleUrls: ['./dform.metaText.scss'],
}, DFormAbstractComponent.metaData );

@Component(metaData)
export class DFormMetaTextComponent extends DFormAbstractComponent {

  constructor() {
    super();
  }

  public toggle(key) {
    this.form.controls[key].setValue('');
    this.element['disabled'] = !this.element['disabled'];
  }

};
