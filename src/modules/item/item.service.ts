import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { BaseService } from '../../shared/abstracts/base.service';

@Injectable()
export class ItemService extends BaseService<Item> {

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {
    super(itemRepository)
  }
}