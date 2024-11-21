
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService:JwtService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   try {
    const request = context.switchToHttp().getRequest()
    // console.log(request.headers);
    const token = request.headers.authorization
    console.log(token);
    

    return true;
   } catch (error) {
    
   }
  }
}
