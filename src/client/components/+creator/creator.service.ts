// Importables
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
// import { OnDestroy } from '@angular/core';
// import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { forwardRef } from '@angular/core';
import * as R from 'ramda';
import * as _ from 'lodash';

// DForm
import { AppState } from '../app';
import { getChannels } from '../app';
import { DFormElement } from '../dform';
import { DFormService } from '../dform';

@Injectable()
export class CreatorService {

  private _form$: BehaviorSubject<any> = new BehaviorSubject([]); // first empty channnels

  constructor(
    private store: Store<AppState>,
    private dFormService: DFormService
  ) {
    this.store.let(getChannels())
      .distinctUntilChanged()
      .filter(channels => channels.length !== 0)
      .map(channels => this.mapChannels(R.clone(channels)))
      .map(channels => this.toDForm(channels))
      .subscribe(this._form$);
  }

  // access transformed form
  get form$(): Observable<any> {
    return this._form$.asObservable();
  }

  // transform to form element
  public toDFormElement(el: string, options = {}) {
    // this is the native approach
    return this.dFormService.toFormElement(el)(options);
  }

  // to deform
  private toDForm(channels: any) {
    const test = channels.map(channel => {
      ['content', 'metaData'].forEach(type => {
        channel[type] = channel[type].map(el => this.toDFormElement(el.formType, {
          key: el['name'],
          placeholder: el['displayName'],
          fromMaster: el['fromMaster']
        }));
      });
      return channel;
    });
    return test;
  }

  // transform a form to dform
  private mapChannels(channels: any, key = 'name') {
    const master = _.first(channels.splice(channels.findIndex(el => el.isMaster), 1));
    channels.map(channel => {
      ['content', 'metaData'].forEach(type => {
        channel[type] = channel[type].concat(
          R.differenceWith((x, y) => x[key] === y[key], master[type], channel[type])
            .map((el: DFormElement<any>) => {
              el = _.clone(el);
              el.fromMaster = true;
              return el;
            })
        );
      });
      return channels;
    });
    return [].concat(master, channels);
  }

}
