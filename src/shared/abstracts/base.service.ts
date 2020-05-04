import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class BaseService<T> {
  constructor(private repo: Repository<T>) {
  }

  findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<T> {
    return await this.repo.findOne(id);
  }

  async create(register: T): Promise<T> {
    return await this.repo.create(register);
  }

  async delete(id: string): Promise<void> {
    const item = this.findOne(id);
    if (!item) {
      throw new BadRequestException("Register not found")
    }

    this.repo.delete(id);
  }
}
