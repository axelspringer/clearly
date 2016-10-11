// Importables
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({
  name: 'iteratableObject'
})
export class IteratableObjectPipe implements PipeTransform {

  transform(value: any, args?: any[]): Array<any> {
    return Object.keys(value).map(key => {
      return Object.assign({}, { key }, {value: value[key]});
    });
  }

};
