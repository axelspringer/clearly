// Impotables
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Components
import { DatabaseProvider } from '../../../commons';

@Component({
  selector: 'articles-list',  // <articles-list></articles-list>
  providers: [],
  styleUrls: ['./articles.component.scss'],
  templateUrl: './articles.component.html'
})
export class ArticlesList implements OnInit {

  private _db: DatabaseProvider;
  private allDocs$: Observable<any>;

  constructor(
    db: DatabaseProvider
  ) {
    this._db = db;
    this.allDocs$ = this._db.allDocs().map(docs => docs.rows);
  }

  ngOnInit() {

  }

};
