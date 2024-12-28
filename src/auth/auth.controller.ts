import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService.test();
  }

  @Post('signup')
  signup() {
    return 'Hello';
  }

  @Post('signin')
  signin() {
    return 'Sign in';
  }
}
