// vendor
// import { Action } from '@ngrx/store';
// import { Actions } from '@ngrx/effects';
// import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// custom
// import { ArticleUtils } from './article.service';
// import * as fromArticleActions from './article.actions';

@Injectable()
export class ArticleEffects {

  // @Effect() public updateArticle$: Observable<Action> = this.actions$
  //   .ofType(fromArticleActions.ActionTypes.UPDATE_ARTICLE)
  //   .map(action => action.payload)
  //   .map(type => ({
  //     type: fromArticleActions.ActionTypes.UPDATE,
  //     payload: {
  //       channels: this.articleService.transformToChannels(type.contexts, type.channels),
  //       master: this.articleService.transformToMaster(type.contexts),
  //     },
  //   }));

  // constructor(
  //   private actions$: Actions,
  //   private articleService: ArticleUtils,
  // ) {
  // }

}
