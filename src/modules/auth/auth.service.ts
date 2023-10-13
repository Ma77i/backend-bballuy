import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Authdto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(dto: Authdto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save new user in the db
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name,
          lastName: dto.lastName,
          username: dto.username,
          email: dto.email,
          password: hash,
          role: dto.role,
        },
      });

      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
    }
  }

  signin() {
    return { message: 'Login correct' };
  }
}
