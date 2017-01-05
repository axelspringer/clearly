// Importables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Composition
import { EventEmitProvider } from '../../frameworks/core';
import { ToolbarComponent } from '../toolbar';

@Component({
  selector: 'sg-settings',  // <sg-settings></sg-settings>
  styleUrls: ['./settings.style.css'],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  private title$ = 'Settings';

  // TypeScript public modifiers
  constructor(
    private title: Title,
  ) {}

  public ngOnInit() {
    console.log('hello `Settings` component');
    this.title.setTitle(this.title$);

    EventEmitProvider
      .connect(ToolbarComponent.prototype.constructor.name)
      .emit(this.constructor.name);
  }

}
