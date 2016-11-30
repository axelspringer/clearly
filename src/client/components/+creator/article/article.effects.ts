// Importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Components
import { ArticleActions } from './article.actions';
import { ArticleService } from './article.service';

@Injectable()
export class ArticleEffects {

  @Effect() public updateArticle$: Observable<Action> = this._actions
    .ofType(ArticleActions.UPDATE_ARTICLE)
    .map(action => action.payload)
    .map(type => ({
      type: ArticleActions.UPDATE,
      payload: {
        channels: this._articleService.transformToChannels(type.contexts, type.channels),
        master: this._articleService.transformToMaster(type.contexts),
      },
    }));

  constructor(
    private _actions: Actions,
    private _articleService: ArticleService,
  ) {
  }

}
