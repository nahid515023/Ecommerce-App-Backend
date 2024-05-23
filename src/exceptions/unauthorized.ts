import { HttpException } from './root'

export class UnauthorizedException extends HttpException {
    constructor(message:string,ErrorCode:number,error?:any){
        super(message,ErrorCode,401,error)
    }
}
