import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existsUser: User | null = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existsUser) throw new ConflictException('User already exists');
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
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
    return this.userModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | { message: string }> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      return { message: 'User not found' };
    }
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
