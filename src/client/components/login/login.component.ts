// importables
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

// components
import { AuthProvider } from '../../core/auth';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sg-login',  // <sg-dashboard></sg-dashboard>
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  // properties

  public isAuthenticating: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _sub: Subscription = null;

  constructor(
    private _auth: AuthProvider,
    private _router: Router,
  ) {}

  // angular

  public ngOnInit() {
    console.log('hello `Login` component');
  }

  // public

  public login() {
    if (this._sub !== null) {
      this._sub.unsubscribe();
    }
    this.isAuthenticating.next(true);
    this._sub = this._auth
      .login()
      .take(1)
      .delay(2500)
      .subscribe(grant => {
        if (grant) {
          this.isAuthenticating.next(false);
          this._router.navigate(['']);
        }
      });
  }

}
