import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { loginSchema } from '@shared/validation/auth';
import { ResponsePattern, ResponsePatternType } from '@shared/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  async login(
    @Body() body: unknown,
  ): Promise<ResponsePatternType<{ id: string; username: string }>> {
    const validated = loginSchema.parse(body);
    // Return standardized success response
    return ResponsePattern.success('Login successful', {
      id: '1',
      username: 'johndoe',
    });
  }
}
