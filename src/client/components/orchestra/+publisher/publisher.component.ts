import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitterBus } from '../../../commons';
import { ToolbarTitleUpdate } from '../../toolbar';

@Component({
  selector: 'publisher',  // <publisher></publisher>
  providers: [],
  templateUrl: './publisher.component.html'
})
export class Publisher implements OnInit {

  constructor() {}

  ngOnInit() {

    EventEmitterBus.get(ToolbarTitleUpdate.prototype.constructor.name)
      .emit('Artikel publizieren ...');

  }

};
