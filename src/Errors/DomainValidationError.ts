export enum DomainValidationErrorTypes {
  required = 'required',
  exists = 'exists',
  notExists = 'notExists',
  notEqual = 'notEqual',
}

interface IErrorMessage {
  type: DomainValidationErrorTypes;
  param: string;
  message: string;
}

export class DomainValidationErrorCreator {
  constructor(
    public type: DomainValidationErrorTypes,
    public param: string,
    public message: string,
  ) {}

  do() {
    return new DomainValidationError({
      type: this.type,
      param: this.param,
      message: this.message,
    });
  }
}

export default class DomainValidationError {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    public message: string | object | IErrorMessage = '',
  ) {}

  getError() {
    return this.message;
  }
}
