import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitProvider } from '../../../core';
import { ToolbarTitleUpdate } from '../../toolbar';

@Component({
  selector: 'publisher',  // <publisher></publisher>
  providers: [],
  templateUrl: './publisher.component.html'
})
export class Publisher implements OnInit {

  constructor() {}

  ngOnInit() {

    EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name)
      .emit('Artikel publizieren ...');

  }

};
