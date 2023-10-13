import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';
import { TeamModule } from './modules/team/team.module';
import { FieldModule } from './modules/field/field.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    GameModule,
    TeamModule,
    FieldModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
