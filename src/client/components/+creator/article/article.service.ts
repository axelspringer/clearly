/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { DFORM_TYPES_TOKEN } from '../../../core';
import * as _ from 'lodash';

@Injectable()
export class ArticleService {

  constructor(
    @Inject(DFORM_TYPES_TOKEN) private _formTypes,
  ) {
  }

  public transformToMaster(contexts: any[]) {
    return _.map(_.filter(contexts, context => context.formType.options.channels.length === 0),
      context => this._transformToFormElement(context)); // should also filter for not channel
  }

  public transformToChannels(contexts: any[], channels: any[]) {
    return _.map(channels, channel => {
      return _.map(_.filter(contexts, context =>
        context.formType.options.channels.length === 0 || _.includes(context.formType.options.channels, channel.id)),
          context => this._transformToFormElement(context, channel.id));
          // should map the object, metadata in dform object
    });
  }

  // private
  private _transformToFormElement(context: any, channel?: number) {
    return this._formTypes.toFormType(context.formType.name,
      _.assign(context.formType.options, {channel}, {key: context.name, subject: context.displayName}));
  }

}
