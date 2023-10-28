import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [ProductsModule, DatabaseModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
