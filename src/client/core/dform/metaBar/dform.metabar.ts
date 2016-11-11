// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';

@Component({
  selector: 'sg-dform-metabar',
  templateUrl: './dform.metabar.html',
  styleUrls: ['./dform.metabar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormMetaBarComponent implements OnInit {

  @Input() public formElement: DFormElement<any>;

  // public

  public toggleEdit(): void {
    this.formElement.disabled = !this.formElement.disabled;
  }

  // angular

  public ngOnInit(): void {
    console.log(`Initializing ${this.constructor.name}`);
  }

};
