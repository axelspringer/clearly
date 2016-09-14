// Importables
import {
  Component,
  OnInit,
  OnDestroy,
  ApplicationRef
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Components
import { EmitterService } from '../../../commons';
import { ToolbarTitleUpdate } from '../../toolbar';
import {
  DFormText,
  DFormElement
} from '../../dform';
import { CreatorService } from './creator.service';
import { DBService } from '../../../services';
import {
  Observable,
  Subscription
} from 'rxjs';
import { DBConfig } from '../../../config';

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

  private _id: string;

  private db$: DBService;
  private data$: Subscription;
  private updates$: Subscription;

  constructor(
    private appRef: ApplicationRef,
    private creatorService: CreatorService,
    private route: ActivatedRoute,
    db$: DBService
  ) {

    this.db$ = db$;
    this.updates$ = this.db$.updates.subscribe(val => console.log(val));

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
    this.data$ = this.route.data.subscribe(data => this._id = data['_id']);

    // this.db$.open(DBConfig.NAME).last().subscribe(val => console.log('TEST', val));

  }

  ngOnDestory() {

    // should destroy remaining references to db
    this.data$.unsubscribe();
    this.updates$.unsubscribe();

  }

  save($event) {
    this.form = $event;
    this.db$.update(this._id['id'], $event.value);
  }

};
