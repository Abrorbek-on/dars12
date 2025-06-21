import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  create(@Body() dto: UserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha foydalanuvchilar royxati' })
  findAll() {
    return this.usersService.findAll();
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchini toliq yangilash (PUT, token bilan)' })
  updateFull(@Body('where') where: Partial<UserDto>,@Body('data') data: Required<UserDto>) {
    return this.usersService.update(where, data);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchini ochirish (dto orqali, token bilan)' })
  delete(@Body() dto: Partial<UserDto>) {
    return this.usersService.delete(dto);
  }
}
