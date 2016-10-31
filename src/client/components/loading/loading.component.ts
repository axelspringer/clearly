// Impotables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-loading',  // <my-loading></my-loading>
  styleUrls: ['./loading.style.scss'],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {

  @Input() public shouldBeLoading: Observable<boolean>;

};
