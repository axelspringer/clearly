import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitterBus } from '../../../commons';
import { ToolbarTitleUpdate } from '../../toolbar';

@Component({
  selector: 'editor',  // <creator></creator>
  providers: [],
  templateUrl: './editor.component.html'
})
export class Editor implements OnInit {

  constructor() {}

  ngOnInit() {

    EventEmitterBus.get(ToolbarTitleUpdate.prototype.constructor.name).emit('Story entwickeln ...');

  }

};
