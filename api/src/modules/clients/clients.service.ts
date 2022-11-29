import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO, updateClientDTO } from './clients.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClientDTO) {
    const userExists = await this.prisma.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new HttpException('Client already exists', HttpStatus.CONFLICT);
    }

    const client = await this.prisma.client.create({
      data,
    });

    return client;
  }

  async listClients() {
    const clients = await this.prisma.client.findMany({
      include: {
        contact: true,
      },
    });

    return clients;
  }

  async updateClient(data: updateClientDTO, client_id: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: client_id,
      },
    });

    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    const updateClient = await this.prisma.client.update({
      data,
      where: {
        id: client_id,
      },
    });

    return updateClient;
  }

  async deleteClient(client_id: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: client_id,
      },
    });

    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.client.delete({
      where: {
        id: client_id,
      },
    });
  }
}
