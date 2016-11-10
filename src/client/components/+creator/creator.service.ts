// Importables
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

// DForm
import { DFormElement } from '../../core';
import { DForm } from '../../core';

@Injectable()
export class CreatorService {

  private __dFormSubject: BehaviorSubject<Array<DFormElement<any>>> = new BehaviorSubject([]);
  private __channels: Array<any> = [];

  constructor(
    private __dForm: DForm,
  ) {
  }

  // compile to

  get channels() {
    return this.__channels;
  }

  set channels(channels) {
    this.__channels = channels
    this.__next(channels);
  }

  get form() {
    return this.__dFormSubject.asObservable();
  }

  public filter(channels) {
    this.__next(this.__channels.filter(channel => channel.isMaster || channels[channel.name]));
  }

  // private

  private __next(channels: Array<any>) {
    this.__dFormSubject.next(this.__transformToDForm(this.__diffChannelsWithMaster(_.clone(channels))));
  }

  private __transformToDFormElement(el: string, options = {}) {
    // this is the native approach
    return this.__dForm.newFormType(el)(options);
  }

  // to deform
  private __transformToDForm(channels: any) {
    return _.map(channels, channel => {
      _.each(['content', 'metaData'], type => {
        channel[type] = _.map(channel[type], el =>
          this.__transformToDFormElement(el['formType'], {
            key: el['name'],
            placeholder: el['displayName'],
            fromMaster: el['fromMaster'],
          }));
      });
      return channel;
    }) as Array<DFormElement<any>>;
  }

  private __diffChannelsWithMaster(channels: any, key = 'name') {
    const master = _.head(channels.splice(channels.findIndex(el => el.isMaster), 1));
    _.map(channels, channel => {
      _.each(['content', 'metaData'], type => {
        channel[type] = _.concat(channel[type], _.map(_.filter(master[type], el => !_.find(channel[type], el[key])), el => {
          return _.assign({}, el, { fromMaster: true });
        }));
      });
      return channel;
    });
    return _.concat([], master, channels);
  }
}
