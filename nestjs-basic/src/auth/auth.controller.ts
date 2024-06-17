import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto, RegisterUserDto } from '../users/dto/create-user.dto';
import { ResponseMessage } from '../decorator/response_message.decorator';


@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  handleLogin(@Request() req){
    return this.authService.login(req.user);
  }

  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @ResponseMessage("Register successfully!")
  @Post("/register")
  handleRegister(@Body() registerUserDTO: RegisterUserDto){
    return this.authService.register(registerUserDTO);
  }
}
