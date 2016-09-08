import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmitterService } from '../../commons';
import { Toolbar } from '../toolbar';

@Component({
  selector: 'backpack',  // <backpack></backpack>
  providers: [],
  styleUrls: [ './backpack.style.scss' ],
  templateUrl: './backpack.template.html'
})
export class Backpack implements OnInit {

  static $title: string = 'Backpack';

  constructor(
    private title: Title
  ) {

  }

  ngOnInit() {

    this.title.setTitle(Backpack.$title);
    EmitterService.get(Toolbar.prototype.constructor.name).emit(this.constructor.name);

  }

};
