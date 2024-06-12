import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://luan2003hhbg:twPYf59N3c21hsMa@cluster0.dwpd44g.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
