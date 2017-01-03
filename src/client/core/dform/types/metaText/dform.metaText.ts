/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// Components
import { DFormElement } from '../../dform.element';
import { IDFormElementOptions } from '../../dform.element';
import { DFormAbstractComponent } from '../../dform.element.abstract';

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

@Component({ // we patch metaData, have to wait for next release of Angular
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-dform-meta-text',
  styleUrls: ['./dform.metaText.scss'],
  templateUrl: './dform.metaText.html',
})
export class DFormMetaTextComponent extends DFormAbstractComponent {

  constructor() {
    super();
  }

  public toggle(key) {
    this.form.controls[key].setValue('');
    this.element['disabled'] = !this.element['disabled'];
  }

};
