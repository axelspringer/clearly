// Importables
import { OpaqueToken } from '@angular/core';
import * as dform from './index';
import * as _ from 'lodash';

export const DFORM_TYPES_TOKEN = new OpaqueToken('DFORM_TYPES');

export interface IDFormTypes {
  toFormType(type: any, options: any);
}

// put here to avoid side-effects
class DFormTypes {

  public static types = [
    {
      name: 'abstract',
      useClass: 'DFormAbstractText',
    },
    {
      name: 'mainText',
      useClass: 'DFormMainText',
    },
    {
      name: 'metaText',
      useClass: 'DFormMetaText',
    },
    {
      name: 'picture',
      useClass: 'DFormPicture',
    },
    {
      name: 'socialVideo',
      useClass: 'DFormSocialVideo',
    },
    {
      name: 'text',
      useClass: 'DFormText',
    },
    {
      name: 'textArea',
      useClass: 'DFormTextArea',
    },
    {
      name: 'tweet',
      useClass: 'DFormText',
    },
  ];

  public toFormType(name: any, options: any) {
    const useType = _.find(DFormTypes.types, type => type.name === name);
    return !_.isUndefined(useType) ? new dform[useType['useClass']](options) : useType;
  }

};

// Exportables
export enum KEY_CODES {
  BACKSPACE = 8,
  ENTER = 13,
}

export const DFORM_TYPES_PROVIDER = {
  provide: DFORM_TYPES_TOKEN,
  useFactory: () => {
    return new DFormTypes();
  },
};

// export * from './abstract';
export * from './dform.component.focus';
export * from './dform.component';
export * from './dform.element.component';
export * from './dform.element.events';
export * from './dform.element';
export * from './dform.service';
export * from './dform.element.abstract';
export * from './dropDown';
export * from './mainText';
export * from './metaBar';
export * from './metaText';
export * from './picture';
export * from './context';
export * from './socialVideo';
export * from './text';
export * from './textArea';
