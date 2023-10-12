import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormConfig } from "./_common/typeorm.config";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({useFactory:ormConfig})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
