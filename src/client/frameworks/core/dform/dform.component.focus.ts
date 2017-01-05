// Importables
import { Event } from '../events';

// Interface
export class DFormComponentFocus extends Event {
  constructor(payload: any = {}) {
    super(payload);
  }
}
