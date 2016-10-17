// Importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormElement } from '../dform.element';

export class DFormMetaText extends DFormElement<string> {

  public controlType = 'metaText';
  public type: string;
  public placeholder: string;
  public hint: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.placeholder = options['placeholder'] || '';
    this.hint = options['hint'] || '';
  }

};

@Component({
  selector: 'dform-meta-text',
  templateUrl: './dform.metaText.html',
  styleUrls: [
    './dform.metaText.scss'
  ]
})
export class DFormMetaTextComponent implements OnInit {

  @Input() element: DFormElement<string>;
  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

};
