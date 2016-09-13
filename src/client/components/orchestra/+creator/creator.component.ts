import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmitterService } from '../../../commons';
import { ToolbarTitleUpdate } from '../../toolbar';
import {
  DFormText,
  DFormElement
} from '../../dform';

@Component({
  selector: 'creator',  // <creator></creator>
  providers: [],
  styleUrls: [
    './creator.style.scss'
  ],
  templateUrl: './creator.component.html'
})
export class Creator implements OnInit {

  public elements: Array<String> = [];
  public form: DFormElement<any>[] = [];

  constructor() {
  }

  addElement($event) {
    this.form.push(new DFormText({
      key: `test${ Math.floor((Math.random() * 100) + 1) }`,
      value: ''
    }));
    this.elements.push($event.dragData);
  }

  ngOnInit() {

    // try tp emit new event
    EmitterService.get(ToolbarTitleUpdate.prototype.constructor.name).emit('Artikel erstellen ...');

    // form builder for creator

  }

};
