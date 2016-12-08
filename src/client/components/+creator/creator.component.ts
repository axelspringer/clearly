// Importables
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

// Components
import { ArticleActions } from './article';
// import { ChannelsDialogComponent } from './dialogs';
import { CreatorActions } from './creator.actions';
import { EventEmitProvider } from '../../core';
import { getCreatorSelectedType } from '../app';
import { IAppState } from '../app';
import { ToolbarTitleUpdate } from '../toolbar';
import { getArticleChannel } from '../app';
import { getArticleMaster } from '../app';

@Component({
  selector: 'sg-creator',  // <creator></creator>
  styleUrls: ['./creator.component.scss'],
  templateUrl: './creator.component.html',
})
export class CreatorComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  // public dialogRef: MdDialogRef<ChannelsDialogComponent>;
  public lastCloseResult: string;

  public i18nTitle = 'ORCHESTRA.CREATOR.TITLE';
  public form$: any;

  public title = 'Test';
  public icons = 'fa-user';

  constructor(
    // public dialog: MdDialog,

    private _store: Store<IAppState>,
    private _articleActions: ArticleActions,
    private _creatorActions: CreatorActions,
    private _translate: TranslateService,
  ) {
  }

  // public

  public get selectedType(): Observable<any> {
    return this._store.let(getCreatorSelectedType())
      .distinctUntilChanged()
      .filter(selectedType => !_.isUndefined(selectedType));
  }

  public articleChannel(id: number): Observable<any> {
    return this._store
      .let(getArticleChannel(id))
      .distinctUntilChanged()
      .filter(channel => !_.isUndefined(channel));
  }

  public get articleMaster(): Observable<any> {
    return this._store
      .let(getArticleMaster())
      .distinctUntilChanged()
      .filter(master => !_.isUndefined(master));
  }

  public test() {
    console.log('test');
  }

  // angular

  public ngOnInit() {
    console.log(`Initializing 'Creator' ...`);

    this.selectedType
      .subscribe(selectedType => {
        this._store.dispatch(this._articleActions.updateArticle(selectedType));
      });

    this._store.dispatch(this._creatorActions.selectType(0));

    this._translate.get(this.i18nTitle).subscribe(t =>
      EventEmitProvider.connect(ToolbarTitleUpdate.prototype.constructor.name).emit(t));
  }

  public toggleChannels() {
    // let config = new MdDialogConfig();
    // config.viewContainerRef = this._viewContainerRef;
    // this.dialogRef = this.dialog.open(ChannelsDialogComponent, config);
    // this.dialogRef.afterClosed().subscribe(result => {
    //   this.lastCloseResult = result;
    //   this.dialogRef = null;
    // });
  }

  public ngOnDestroy() {
    // TODO(@sdoell): unsubscribe to all subscriptions
  }

  public onFormUpdate($event) {
    this.form = $event;
  }

};
