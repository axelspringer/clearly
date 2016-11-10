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

  // should be refactored to some else

  @Input() public formElement: DFormElement<any>;

  constructor(
    // @Inject(forwardRef(() => DFormComponent)) private __parentComponent,
  ) { }

  // public

  public toggleEdit(): void {
    this.formElement.disabled = !this.formElement.disabled;
  }

  // angular

  public ngOnInit(): void {
    console.log(`Initializing ${this.constructor.name}`);
  }

};
