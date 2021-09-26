export type UniqueIdentifier = string | number;

export enum Operation {
  ok = 'ok',
  fail = 'fail',
}

export default abstract class BaseEntity<T> {
  static new<T>(this: new () => T, params: NonFunctionProperties<T>): T {
    return Object.assign(new this(), params);
  }
}

type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
