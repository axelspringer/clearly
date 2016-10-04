// Importables
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';

// Components
import { AppState } from '../app';
import { CreatorActions } from './creator.actions';
import { CreatorService } from './creator.service';
import { DFormElement } from '../dform';
import { DFormText } from '../dform';
import { EventEmitProvider } from '../../core';
import { getCreatorItems } from '../app';
import { ToolbarTitleUpdate } from '../toolbar';

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
export class Creator implements OnInit, OnDestroy {

  form: FormGroup;

  private elements: number = 0;
  private i18nTitle = 'ORCHESTRA.CREATOR.TITLE';
  private store$: any;

  constructor(
    private creatorService: CreatorService,

    private creatorActions: CreatorActions,
    private store: Store<AppState>,
    private translate: TranslateService,

    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.store$ = this.store.let(getCreatorItems());

    this.route.data.subscribe(val => console.log(val));

    // pre publish model with title
    const item = this.creatorService.toDForm('text', {
      key: `${++this.elements - 1}`
    });
    this.store.dispatch(this.creatorActions.addItem(item));

    this.translate.get(this.i18nTitle).subscribe(t =>
      EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(t));
  }

  ngOnDestroy() {
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

};
