import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitProvider } from '../../../core';
import { ToolbarTitleUpdate } from '../../toolbar';

@Component({
  selector: 'editor',  // <creator></creator>
  providers: [],
  templateUrl: './editor.component.html'
})
export class Editor implements OnInit {

  constructor() {}

  ngOnInit() {

    EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name)
      .emit('Story entwickeln ...');

  }

};
