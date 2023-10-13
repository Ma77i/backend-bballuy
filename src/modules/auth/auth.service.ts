import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Authdto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(dto: Authdto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save new user in the db
    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        lastName: dto.lastName,
        username: dto.username,
        email: dto.email,
        password: hash,
      },
    });

    // return the saved user
    return user;
  }

  signin() {
    return { message: 'Login correct' };
  }
}
