import { Component } from '@angular/core';
import { EventEmitProvider } from '../../../core';
import { OnInit } from '@angular/core';
import { ToolbarTitleUpdate } from '../../toolbar';

@Component({
  selector: 'sg-publisher',  // <publisher></publisher>
  templateUrl: './publisher.component.html',
})
export class PublisherComponent implements OnInit {

  public ngOnInit() {
    EventEmitProvider
      .connect(ToolbarTitleUpdate.prototype.constructor.name)
      .emit('Artikel publizieren ...');
  }

};
