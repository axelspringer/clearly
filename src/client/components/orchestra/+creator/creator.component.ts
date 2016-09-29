// Importables
import {
  Component,
  OnInit,
  OnDestroy,
  ApplicationRef
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';

// Components
import { EventEmitProvider } from '../../../core';
import { ToolbarTitleUpdate } from '../../toolbar';
import {
  DFormText,
  DFormElement
} from '../../dform';
import { CreatorService } from './creator.service';

import {
  AppState,
  getCreatorItems
} from '../../app';

import { CreatorActions } from './creator.actions';

@Component({
  selector: 'creator',  // <creator></creator>
  providers: [
    CreatorService,
    CreatorActions
  ],
  styleUrls: [
    './creator.style.scss'
  ],
  templateUrl: './creator.component.html',
})
export class Creator implements OnInit {

  form: FormGroup;

  private elements: number = 0;
  private i18nTitle = 'ORCHESTRA.CREATOR.TITLE';
  private store$: any;
  private doc$: any;
  private doc: any;

  constructor(
    private creatorService: CreatorService,

    private creatorActions: CreatorActions,
    private store: Store<AppState>,
    private translate: TranslateService,

    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.store$ = this.store.let(getCreatorItems());
    this.doc$ = this.route.data
      .select(s => s['doc'])
      .subscribe(doc => this.doc = doc);

  }

  ngOnInit() {
    this.translate.get(this.i18nTitle).subscribe(t =>
      EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(t));
  }

  ngOnDestory() {
    this.store$.unsubscribe();
  }

  addItem($event) {
    const item = this.creatorService.toDForm($event.dragData, {
      key: `${++this.elements - 1}`
    });
    this.store.dispatch(this.creatorActions.addItem(item));
  }

  onFormUpdate($event) {
    this.form = $event;

    // update to dispatch
    // this.store.dispatch(this.creatorActions.update($event.value));

  }

  create($event) {
    this.router.navigate(['article', this.doc.id, 'edit']);
  }

};
