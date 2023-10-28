import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OptionalParseUUIDPipe } from 'src/pipes/OptionalParseUUIDPipe';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('categoryId', OptionalParseUUIDPipe) categoryId?: string,
  ) {
    return this.productsService.findAll({
      name,
      categoryId,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.findById(id);

    if (!product) {
      throw new NotFoundException();
    }
    return this.productsService.remove(id);
  }
}
