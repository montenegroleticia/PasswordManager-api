import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { UsersService } from './users.service';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  getUserInformation(@User() user) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Delete('/erase')
  deleteUser(@User() user, @Body() DeleteUserDto: DeleteUserDto) {
    const userId = user.id;
    return this.usersService.deleteUser(userId, DeleteUserDto.password);
  }
}
