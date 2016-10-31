// Impotables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-loading',  // <sg-loading></sg-loading>
  styleUrls: ['./loading.style.scss'],
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit {

  @Input() public shouldBeLoading: Observable<boolean>;

  public ngOnInit() {
    setTimeout(() => {
      console.log('test');
      this.shouldBeLoading = Observable.of(false);
    }, 4000);
  }

};
