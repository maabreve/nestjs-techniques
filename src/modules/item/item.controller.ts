import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ItemService } from './Item.service';
import { Item } from '../../entities/Item.entity';
import { AuthGuard } from '@nestjs/passport';
import { UseClaims } from '../auth/decorators/claims.decorator';
import { ClaimsGuard } from '../auth/guards/claims.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemsService: ItemService) { }

  @UseGuards(AuthGuard('jwt'), ClaimsGuard)
  @UseClaims('read:item') @Get()
  async getAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @Post()
  async create(@Body('Item') item: Item): Promise<Item> {
    return await this.itemsService.create(item);
  }

  @Put()
  update(@Body('Item') item: Item) {
    // this.itemsService.update(Item);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.itemsService.delete(id);
  }
}