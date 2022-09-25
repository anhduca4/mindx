import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }


  async login(payloadDto: LoginDto) {
    const userDb = await this.usersService.findOneByUsername(payloadDto.username);
    if (!userDb) {
      throw new BadRequestException('Can not login');
    }
    if (!bcrypt.compareSync(payloadDto.password, userDb.password)) {
      throw new BadRequestException('Can not login');
    }
    const payload = { username: userDb.username, isAdmin: userDb.isAdmin, sub: userDb.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
