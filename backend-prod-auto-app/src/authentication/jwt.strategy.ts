import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  //users --> user
  async validate(payload: { email: any; id: any }) {
    console.log(payload);

    const user = await this.databaseService.users.findUnique({
      where: {
        email: payload.email,
        id: payload.id,
      },
    });
    console.log('User in jwtStrategy:', user);
    return user;
  }
}
