import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
import { ItemController } from './item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService],
  controllers: [ItemController,]
})
export class ItemModule { }
