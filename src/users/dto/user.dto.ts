import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  recycleBin: boolean;
}
