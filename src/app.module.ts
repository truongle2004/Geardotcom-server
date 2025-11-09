import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaleModule } from './modules/sale-module/sale.module';
import { AuthModule } from './modules/auth-module/auth.module';
import { JwtAuthGuard } from './modules/auth-module/guards/jwt-auth.guard';
import databaseConfig from './configs/database.config';
import keycloakConfig from './configs/keycloak.config';
import {
  Product,
  ProductCategory,
  ProductVendor,
  ProductImage,
  ProductReview,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Coupon,
  CouponUsage,
  Discount,
  Warehouse,
  WarehouseDetail,
  Wishlist,
  WishlistItem,
} from './domain/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, keycloakConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [
          Product,
          ProductCategory,
          ProductVendor,
          ProductImage,
          ProductReview,
          Cart,
          CartItem,
          Order,
          OrderItem,
          Coupon,
          CouponUsage,
          Discount,
          Warehouse,
          WarehouseDetail,
          Wishlist,
          WishlistItem,
        ],
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get<boolean>('database.logging'),
        timezone: configService.get<string>('database.timezone'),
      }),
    }),
    AuthModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
