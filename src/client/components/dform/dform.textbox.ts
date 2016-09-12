import { DFormElement } from './dform.element';

export class DFormTextbox extends DFormElement<String> {

  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};
