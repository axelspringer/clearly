// Importables
import {
  Injectable
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

// DForm
import { DFormText } from '../../dform';

@Injectable()
export class CreatorService {

  static proto = {
    'text' : (options => new DFormText(options))
  };

  constructor() { }

  toDForm(el: string, options = {}) {

    // this is the native approach

    return CreatorService.proto[el](options);

  }



}
