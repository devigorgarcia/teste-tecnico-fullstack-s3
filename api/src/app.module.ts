import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [PrismaModule, ClientsModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
