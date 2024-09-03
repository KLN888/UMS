import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  isEmptyField(value: any) {
    if (this.isNullOrUndefined(value) || value === '' || value === 'null') {
        return true;
    }
    return false;
}

isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

  deepClone(object:any): any {
    if (this.isEmptyField(object)) {
      return;
    }
    if (Array.isArray(object)) {
      return object.slice();
    }
    const cloneObj :any= {};
    const attributes = Object.keys(object);
    for (const attribute of attributes) {
      const property = object[attribute];

      if (typeof property === 'object') {
        cloneObj[attribute] = this.deepClone(property);
      } else {
        cloneObj[attribute] = property;
      }
    }
    return cloneObj;
  }
}
