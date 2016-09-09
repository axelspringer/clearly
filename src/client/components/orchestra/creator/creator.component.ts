import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmitterService } from '../../../commons';
import { ToolbarTitleUpdate } from '../../toolbar';

@Component({
  selector: 'creator',  // <creator></creator>
  providers: [],
  templateUrl: './creator.component.html'
})
export class Creator implements OnInit {

  constructor() {}

  ngOnInit() {

    EmitterService.get(ToolbarTitleUpdate.prototype.constructor.name).emit('Story erstellen ...');

  }

};
