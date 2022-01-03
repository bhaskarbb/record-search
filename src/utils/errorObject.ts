export enum ErrorCode {
  VALIDATION_ERROR = 1,
  AUTHENTICATION_ERROR = 2,
  AUTHORIZATION_ERROR = 3,
  NOT_FOUND = 4,
  INTERNAL_SERVER_ERROR = 5,
}

/**
 * Custom error object. Uses predefined error code enums
 */
export class ErrorObject extends Error {
  code: number;
  msg: string;

  constructor(errorCode: ErrorCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, ErrorObject.prototype);

    this.code = errorCode;
    this.msg = message;
  }
}
