import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';

import { LoginDto } from './dto/login_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.databaseService.users.findUnique({
      where: { email },
    });
    console.log(user);
    console.log(this.jwtService.sign({ email }));
    if (!user) {
      throw new NotFoundException('user not found');
    }

    console.log(password, user.password);
    const validatePassword = await bcrypt.compare(password, user.password);
    console.log(password, user.password, validatePassword);
    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }
}
