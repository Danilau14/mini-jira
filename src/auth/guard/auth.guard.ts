import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../public/public.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/schemas/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Missing token');

    if (!this.extractTokenFromHeader(request))
      throw new UnauthorizedException('Token not provided');
    try {
      const jwtDecode: JwtPayload = await this.jwtService.verifyAsync(
        authHeader.split(' ')[1],
        {
          secret: this.configService.get('config.jwtSecret'),
        },
      );

      const user: User | null = await this.userService.findOneByEmail(
        jwtDecode.email,
      );

      if (!user) throw new UnauthorizedException('User not found');

      request['user'] = user;

      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Invalid token';
      throw new UnauthorizedException(errorMessage);
    }
  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
