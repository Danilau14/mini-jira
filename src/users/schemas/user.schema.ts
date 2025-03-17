import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, minlength: 2, trim: true })
  name: string;

  @Prop({ required: true, minlength: 2, trim: true })
  lastName: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;

  @Prop({ default: false })
  recycleBin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: 1 }, { collation: { locale: 'es', strength: 2 } });
UserSchema.index({ lastName: 1 }, { collation: { locale: 'es', strength: 2 } });