
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
    const token = request.headers.authorization
    console.log('Authorization Header:', request.headers['authorization']);
    console.log(request.headers);
    console.log(token);
    

    return true;
   } catch (error) {
    
   }
  }
}
