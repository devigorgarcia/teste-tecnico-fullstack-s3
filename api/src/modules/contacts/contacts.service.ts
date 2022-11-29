import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDTO } from './contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDTO) {
    const { clientId, email } = data;

    if (!clientId) {
      throw new HttpException('Client not exist', HttpStatus.NOT_FOUND);
    }

    const contactExists = await this.prisma.contact.findFirst({
      where: {
        email: email,
      },
    });

    if (contactExists) {
      throw new HttpException('Contact already exists', HttpStatus.CONFLICT);
    }

    const contact = await this.prisma.contact.create({ data });

    return contact;
  }
}
