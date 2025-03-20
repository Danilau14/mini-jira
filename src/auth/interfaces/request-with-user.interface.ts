import { User } from '../../users/schemas/user.schema';

export interface RequestWithUserInterface extends Request {
  user: User;
}
