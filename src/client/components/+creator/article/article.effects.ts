// Importables
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncSubject } from 'rxjs';

// Components
import { ArticleActions } from './article.actions';
import { getArticleType } from '../../app';
import { ArticleService } from './article.service';
import { IAppState } from '../../app';

@Injectable()
export class ArticleEffects {

  @Effect() public updateArticle$: Observable<Action> = this._actions
    .ofType(ArticleActions.UPDATE_ARTICLE)
    .switchMap(() => {
      // emit new subject
      const _subject = new AsyncSubject();

      // use data in store
      this._store.let(getArticleType(0)) // always take first, now
        .subscribe(type => {
          _subject.next({
            type: ArticleActions.UPDATE,
            payload: {
              form: true,
              data: false,
            }
          });
          _subject.complete();
        });

      // use observable
      return _subject.asObservable();
    });
    //   this._store.let(getArticleType(0))
    //     .do(val => console.log(val))
    //     .map(data => ({
    //       type: ArticleActions.UPDATE_FORM,
    //       payload: data
    //     }))
    // );

  // @Effect() public loadArticle$: Observable<Action> = this._actions
  //   .ofType(ArticleActions.LOAD)
  //   .switchMap(() =>

  //     //  this.apollo.query({
  //     //   query: query,
  //     // })
  //     // .map(res => res.data) // slice
  //     // .map(res => ({
  //     //   type: ArticleActions.LOAD_SUCCESS,
  //     //   payload: res.articleTypes,
  //     // }))
  //     // .catch(err => Observable.of({
  //     //   type: 'LOAD_FAILURE',
  //     //   paylod: err,
  //     // }))

  //     );

  constructor(
    private _actions: Actions,
    private _store: Store<IAppState>,
    private _articleService: ArticleService
  ) {
  }

}
