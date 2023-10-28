import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { ProductsRepository } from 'src/shared/database/repositories/procuts.repositories';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepo: ProductsRepository,
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId, color, description, name, price } = createProductDto;

    const promotionalPrice = await this.getPromotionalPrice(categoryId, price);

    return this.productsRepo.create({
      data: {
        name,
        description,
        color,
        price,
        promotionalPrice,
        categoryId,
      },
    });
  }

  findAll(filters: { name?: string; categoryId?: string }) {
    return this.productsRepo.findMany({
      where: {
        name: {
          contains: filters.name,
          mode: 'insensitive',
        },
        categoryId: filters.categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  findById(id: string) {
    return this.productsRepo.findById(id);
  }

  remove(id: string) {
    return this.productsRepo.delete({
      where: {
        id,
      },
    });
  }

  async getPromotionalPrice(categoryId: string, price: number) {
    const { discountPercentage } =
      await this.categoriesRepo.findById(categoryId);

    return parseFloat((price - price * discountPercentage).toFixed(2));
  }
}
