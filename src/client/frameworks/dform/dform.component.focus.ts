// Importables
import { CoreEvent } from '../core';

// Interface
export class DFormComponentFocus extends CoreEvent {
  constructor(payload: any = {}) {
    super(payload);
  }
}
