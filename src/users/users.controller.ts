import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { ParseMongoIdPipe } from '../parse-mongo-id-pipe/parse-mongo-id-pipe.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return plainToInstance(UserDto, this.usersService.findAll(), {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return plainToInstance(UserDto, this.usersService.findOneById(id), {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('/delete/:id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
