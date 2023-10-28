import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repositories';
import { ProductsRepository } from './repositories/procuts.repositories';

@Global()
@Module({
  providers: [PrismaService, ProductsRepository, CategoriesRepository],
  exports: [ProductsRepository, CategoriesRepository],
})
export class DatabaseModule {}
