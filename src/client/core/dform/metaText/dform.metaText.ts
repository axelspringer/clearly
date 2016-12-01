/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ApplicationRef } from '@angular/core';

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

// const metaData = Object.assign(, DFormAbstractComponent.metaData );

@Component({ // we patch metaData, have to wait for next release of Angular
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-dform-meta-text',
  styleUrls: ['./dform.metaText.scss'],
  templateUrl: './dform.metaText.html',
})
export class DFormMetaTextComponent extends DFormAbstractComponent {

  constructor(
    @Inject(forwardRef(() => ApplicationRef)) public _appRef: ApplicationRef,
  ) {
    super(_appRef);
  }

  public toggle(key) {
    this.form.controls[key].setValue('');
    this.element['disabled'] = !this.element['disabled'];
  }

};
