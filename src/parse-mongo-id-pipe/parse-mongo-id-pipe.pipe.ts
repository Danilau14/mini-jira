
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (ObjectId.isValid(value) && new ObjectId(value).toString() === value) {
      return value;
    }
    throw new BadRequestException(`Invalid Mongo ID: ${value}`);
  }
}
