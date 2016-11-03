// Importables
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as R from 'ramda';
import * as _ from 'lodash';

// DForm
import { DFormElement } from '../../core';
import { DForm } from '../../core';

@Injectable()
export class CreatorService {

  private _dForm = new BehaviorSubject([]);
  private _channels = [];

  constructor(
    private dFormService: DForm,
  ) {
  }

  get channels() {
    return this._channels;
  }

  set channels(channels) {
    this._channels = channels;
    this.next(channels);
  }

  get form() {
    return this._dForm.asObservable();
  }

  public filter(channels) {
    this.next(this._channels.filter(channel => channel.isMaster || channels[channel.name]));
  }

  public next(channels) {
    this._dForm.next(this.toDForm(this.differChannel(R.clone(channels))));
  }

  // transform to form element
  public toDFormElement(el: string, options = {}) {
    // this is the native approach
    return this.dFormService.toFormElement(el)(options);
  }

  // to deform
  public toDForm(channels: any) {
    return channels.map(channel => {
      ['content', 'metaData'].forEach(type => {
        channel[type] = channel[type].map(el => this.toDFormElement(el.formType, {
          key: el['name'],
          placeholder: el['displayName'],
          fromMaster: el['fromMaster'],
        }));
      });
      return channel;
    });
  }

  // transform a form to dform
  public differChannel(channels: any, key = 'name') {
    const master = _.first(channels.splice(channels.findIndex(el => el.isMaster), 1));
    channels.map(channel => {
      ['content', 'metaData'].forEach(type => {
        channel[type] = channel[type].concat(
          R.differenceWith((x, y) => x[key] === y[key], master[type], channel[type])
            .map((el: DFormElement<any>) => {
              el = _.clone(el);
              el.fromMaster = true;
              return el;
            }),
        );
      });
      return channels;
    });
    return [].concat(master, channels);
  }

}
