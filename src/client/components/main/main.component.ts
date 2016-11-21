// Importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'sg-main',  // <sg-main></sg-main>
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Main` component');
  }

}
