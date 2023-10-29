import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, discount } = createCategoryDto;

    return this.categoriesRepo.create({
      data: {
        name,
        discountPercentage: this.transformDiscountPercentageToDecimal(discount),
      },
    });
  }

  findAll() {
    return this.categoriesRepo.findMany();
  }

  transformDiscountPercentageToDecimal(percentage: number) {
    return percentage / 100;
  }
}
