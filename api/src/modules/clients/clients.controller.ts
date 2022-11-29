import {
  Controller,
  Post,
  HttpCode,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateClientDTO, updateClientDTO } from './clients.dto';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateClientDTO) {
    return this.clientsService.create(data);
  }

  @Get()
  async listClients() {
    return this.clientsService.listClients();
  }

  @Patch(':client_id')
  async updateClient(
    @Param('client_id') client_id: string,
    @Body() data: updateClientDTO,
  ) {
    return this.clientsService.updateClient(data, client_id);
  }

  @Delete(':client_id')
  async deleteClient(@Param('client_id') client_id: string) {
    return this.clientsService.deleteClient(client_id);
  }
}
