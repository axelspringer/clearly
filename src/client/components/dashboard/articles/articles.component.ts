// Impotables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Components
import { DatabaseProvider } from '../../../core';

@Component({
  selector: 'articles-list',  // <articles-list></articles-list>
  styleUrls: ['./articles.component.scss'],
  templateUrl: './articles.component.html'
})
export class ArticlesList implements OnInit {

  @Input() docs: Observable<any>;

  constructor(
  ) {

  }

  ngOnInit() {

  }

};
