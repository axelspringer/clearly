// Impotables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// Components
import { IAppState } from '../../app';
import { isDocsLoading } from '../../app';

@Component({
  selector: 'sg-articles-list',  // <sg-articles-list></sg-articles-list>
  styleUrls: ['./articles.component.scss'],
  templateUrl: './articles.component.html',
})
export class ArticlesListComponent {

  @Input() public docs: Observable<any>;

  private isDocsLoading$: Observable<any>;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.isDocsLoading$ = this.store.let(isDocsLoading());
  }

};
