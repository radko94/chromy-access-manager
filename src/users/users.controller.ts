import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  @Get()
  public getUsers() {
    return this._usersService.getAll();
  }

  @Get(':id')
  public getUser(@Param() id: number) {
    this._usersService.findById(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this._usersService.createUser(createUserDto);
  }

  @Post(':userId/validateAccessKey/:accessToken')
  @HttpCode(200)
  public validateAccessKey(
    @Param('userId') userId: number,
    @Param('accessToken') accessToken: string,
  ) {
    return this._usersService
      .validateKey(userId, accessToken)
      .then(() => {
        return;
      })
      .catch(() => {
        throw new HttpException(
          'The access token is not valid. You are unauthorized!',
          HttpStatus.UNAUTHORIZED,
        );
      });
  }
}
