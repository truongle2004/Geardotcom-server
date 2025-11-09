import {
  Inject,
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PRODUCT_SERVICE_TOKEN } from 'src/modules/sale-module/application/services/impl/product.service';
import type { IProductService } from 'src/modules/sale-module/application/services/product.service.interface';
import { ProductQueryDto } from 'src/domain/requests/product-query.dto';
import { ApiResponseDto } from 'src/shared/response.dto';
import { API_V1 } from 'src/shared/constants';
import { Public } from 'src/modules/auth-module/decorators/public.decorator';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Products')
@Controller(`${API_V1}/sale/products`)
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: IProductService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get list of products' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getListProduct(@Query() query: ProductQueryDto) {
    const result = await this.productService.getListProductByCategory(query);
    return new ApiResponseDto(result, HttpStatus.OK);
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search products' })
  @ApiResponse({ status: 200, description: 'Success' })
  async searchProducts(@Query() query: ProductQueryDto) {
    const result = await this.productService.searchProducts(query);
    return new ApiResponseDto(result, HttpStatus.OK);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get product detail' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductDetail(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productService.getById(id);
    return new ApiResponseDto(result, HttpStatus.OK);
  }

  @Get('categories')
  @Public()
  @ApiOperation({ summary: 'Get list of categories' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getListCategory() {
    try {
      const result = await this.productService.getAllProductCategory();
      return new ApiResponseDto(result, HttpStatus.OK);
    } catch (err) {
      console.log(err)
    }
    return null
  }

  @Get('vendors')
  @Public()
  @ApiOperation({ summary: 'Get list of vendors' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getVendor() {
    const result = await this.productService.getAllVendor();
    return new ApiResponseDto(result, HttpStatus.OK);
  }

  @Get('best-sellers')
  @Public()
  @ApiOperation({ summary: 'Get best sellers' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getBestSellers(@Query() query: ProductQueryDto) {
    const result = await this.productService.getBestSellers(query);
    return new ApiResponseDto(result, HttpStatus.OK);
  }

  @Get('featured')
  @Public()
  @ApiOperation({ summary: 'Get featured products' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getFeaturedProducts(@Query() query: ProductQueryDto) {
    const result = await this.productService.getFeaturedProducts(query);
    return new ApiResponseDto(result, HttpStatus.OK);
  }

  @Get('top-rated')
  @Public()
  @ApiOperation({ summary: 'Get top rated products' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getTopRatedProducts(@Query() query: ProductQueryDto) {
    const result = await this.productService.getTopRatedProducts(query);
    return new ApiResponseDto(result, HttpStatus.OK);
  }

  @Get('images/:filename')
  @Public()
  @ApiOperation({ summary: 'Get product image' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async getImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const imageDir = process.env.FILE_UPLOAD_DIR || 'C:\\my_workspace\\Geardotcom_server\\images';
    const imagePath = path.join(imageDir, filename);

    if (!fs.existsSync(imagePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Image not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    return res.sendFile(imagePath);
  }
}

