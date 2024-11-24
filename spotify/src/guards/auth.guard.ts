
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { User } from 'src/Entities/User.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private clsService: ClsService
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest()

      const token = request.headers.authorization.split(" ")[1]
      if (!token) throw new UnauthorizedException("Token doesn't exist")

      const decoded = this.jwtService.verify(token)
      request.user = decoded

      console.log(decoded.userId);
      
      const user = this.userService.findOne({ id: decoded.userId })

      this.clsService.set<User>("user", user)

      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token")
    }
  }
}
