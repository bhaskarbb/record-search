const SUCCESS_CODE = 0;
const SUCCESS_MSG = 'Success';

/**
 * Custom error object. Uses predefined success code and message
 */
export class ResponseObject {
  code: number;
  msg: string;

  constructor(data?: any) {
    this.code = SUCCESS_CODE;
    this.msg = SUCCESS_MSG;
    Object.assign(this, data);
  }
}
