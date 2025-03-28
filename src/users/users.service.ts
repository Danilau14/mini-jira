import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User | null = await this.findOneByEmail(createUserDto.email);

    if (user) throw new BadRequestException('Email already exists');

    const hashedPassword: string = await hash(createUserDto.password, 10);

    return new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    }).save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .sort('name')
      .collation({
        locale: 'en',
        strength: 2,
      })
      .exec();
  }

  async findOneById(id: string): Promise<User | null> {
    const user: User | null = await this.userModel.findOne({ id });
    if (!user) throw new BadRequestException('No user with id');
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | { message: string }> {
    const updatedUser: User | null = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new BadRequestException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User | null> {
    const removedUser: User | null = await this.userModel.findOneAndUpdate(
      { _id: id },
      { recycleBin: true },
      { new: true },
    );
    if (!removedUser) {
      throw new BadRequestException('User not found');
    }
    return removedUser;
  }
}
