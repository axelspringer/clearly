// Importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-quick-access',
  styleUrls: ['./quickAccess.component.scss'],
  templateUrl: './quickAccess.component.html',
})
export class QuickAccessComponent {

  public lastCloseResult: string;

};
