import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuth0Strategy } from './strategies/jwt.auth0.stragegy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtAuth0Strategy],
  exports: [PassportModule],
})
export class AuthModule { }
