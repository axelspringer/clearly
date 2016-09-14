import { DBService } from './../../../services/docs.service';
// Impotables
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'articles-list',  // <articles-list></articles-list>
  providers: [],
  styleUrls: ['./articles.component.scss'],
  templateUrl: './articles.component.html'
})
export class ArticlesList implements OnInit {

  constructor(
    private db: DBService
  ) {
  }

  ngOnInit() {

    this.db.allDocs();

  }

};
