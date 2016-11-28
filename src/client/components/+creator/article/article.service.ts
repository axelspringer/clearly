/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// DForm
// import { DFormElement } from '../../../core';
// import { DForm } from '../../../core';

@Injectable()
export class ArticleService {

  constructor(
    // private dForm: DForm,
  ) {
  }

  public transform(channels: any[], contexts: any[]) {
    return channels.map(channel => {

    });
    // return []

    // [[]].concat(channels).map(channel => { // performance

    // });
  }

  // legacy

  // private _transformToDFormElement(el: string, options = {}) {
  //   // this is the native approach
  //   return this.dForm.newFormType(el)(options);
  // }

  // to deform
  // private _transformToDForm(channels: any) {
  //   return _.map(channels, channel => {
  //     _.each(['content', 'metaData'], type => {
  //       channel[type] = _.map(channel[type], el =>
  //         this._transformToDFormElement(el['formType'], {
  //           key: el['name'],
  //           placeholder: el['displayName'],
  //           fromMaster: el['fromMaster'],
  //         }));
  //     });
  //     return channel;
  //   }) as Array<DFormElement<any>>;
  // }

  // private _diffChannelsWithMaster(channels: any, key = 'name') {
  //   const master = _.head(channels.splice(channels.findIndex(el => el.isMaster), 1));
  //   _.map(channels, channel => {
  //     _.each(['content', 'metaData'], type => {
  //       channel[type] = _.concat(channel[type], _.map(_.filter(master[type], el => !_.find(channel[type], el[key])), el => {
  //         return _.assign({}, el, { fromMaster: true });
  //       }));
  //     });
  //     return channel;
  //   });
  //   return _.concat([], master, channels);
  // }
}
