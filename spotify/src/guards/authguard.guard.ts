import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        // const authHeader = request.headers['authorization'];
        const authHeader = request.headers.authorization;

        // console.log(authHeader);
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header missing');
        }

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
            throw new UnauthorizedException('Token missing');
        }

        try {
            const decoded = this.jwtService.verify(token); // Verify token using JwtService
            request.user = decoded; // Attach user payload to request for further use
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
