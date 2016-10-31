// Impotables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-articles-list',  // <my-articles-list></my-articles-list>
  styleUrls: ['./articles.component.scss'],
  templateUrl: './articles.component.html',
})
export class ArticlesListComponent {

  @Input() public docs: Observable<any>;

};
