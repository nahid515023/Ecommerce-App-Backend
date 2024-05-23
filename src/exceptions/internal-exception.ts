import { HttpException } from './root'

export class InternalExcepton extends HttpException {
  constructor (message: string, errors: any, ErrorCode: number) {
    super(message, ErrorCode, 500, errors)
  }
}
