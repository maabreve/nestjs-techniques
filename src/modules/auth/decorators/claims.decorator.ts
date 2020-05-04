import { SetMetadata } from '@nestjs/common';

export const UseClaims = (...claims: string[]) =>
  SetMetadata('claims', claims);