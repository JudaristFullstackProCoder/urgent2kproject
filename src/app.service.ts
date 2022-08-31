import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, unknown> {
    return {
      message: 'Hello World!',
    };
  }
}
