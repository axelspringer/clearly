import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitProvider } from '../../core';
import { ToolbarTitleUpdate } from '../toolbar';

@Component({
  selector: 'orchestra',  // <orchestra></orchestra>
  providers: [],
  templateUrl: './orchestra.component.html'
})
export class Orchestra implements OnInit {

  constructor() {}

  ngOnInit() {

  }

};
