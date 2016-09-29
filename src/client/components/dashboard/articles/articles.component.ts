// Impotables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
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

  @Input() docs: Observable<any>;

  constructor(
  ) {

    // setTimeout(() => {
    //   this.allDocs$ = this._db.allDocs().map(docs => docs.rows);
    // }, 3000);

    // setTimeout(() => {
    //   this.allDocs$ = this._db.allDocs().map(docs => docs.rows);
    //    this.allDocs$ = this._db.allDocs().map(docs => docs.rows);
    // }, 5000);

  }

  ngOnInit() {

  }

};
