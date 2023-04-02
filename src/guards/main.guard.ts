import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import ErrorHandler from "../helpers/error-handling/error-handler";

@Injectable()
export class MainGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      // console.log('req::::::::::::::::::::::::::::', req)
      // console.log('req.headers', req.headers);
      // console.log('req.body::::::::::::::::::', req.body);
      // console.log('req.body::::::::::::::::::', req);

      return true;
    } catch (e) {
      new ErrorHandler(e, 'MainGuard');
    }
  }
}


