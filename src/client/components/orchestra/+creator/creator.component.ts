// Importables
import {
  Component,
  OnInit,
  ApplicationRef
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

// Components
import { EmitterService } from '../../../commons';
import { ToolbarTitleUpdate } from '../../toolbar';
import {
  DFormText,
  DFormElement
} from '../../dform';
import { CreatorService } from './creator.service';

@Component({
  selector: 'creator',  // <creator></creator>
  providers: [
    CreatorService
  ],
  styleUrls: [
    './creator.style.scss'
  ],
  templateUrl: './creator.component.html',
})
export class Creator implements OnInit {

  public elements: Array<string> = [];
  public backpack: DFormElement<any>[] = [];

  form: FormGroup;

  constructor(
    public appRef: ApplicationRef,
    public creatorService: CreatorService
  ) {
  }

  addElement($event) {

    this.backpack.push(
      this.creatorService.toDForm($event.dragData, {
        key: `${this.elements.push($event.dragData) - 1}`
      })
    );

  }

  ngOnInit() {

    // try tp emit new event
    EmitterService.get(ToolbarTitleUpdate.prototype.constructor.name).emit('Artikel erstellen ...');

    // form builder for creator

  }

};
