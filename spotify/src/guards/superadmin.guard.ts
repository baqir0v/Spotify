
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest()

      const token = request.headers.authorization.split(" ")[1]
      if (!token) throw new UnauthorizedException("Token doesnt exist")


      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      const user = request.user
      if (!user) throw new UnauthorizedException("There is no logged user")

      const { role } = decoded
      if ( role === "super-admin") {
        return true;
      }
      else {
        throw new ForbiddenException("You can't acces this resource")
      }
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
