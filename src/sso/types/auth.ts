import { Entity } from "@/types/entity";

export interface IAuthProps {
  userId: string;
  fullname: string;
  email: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  avatarPath: string;
  permissions: string[];
  isFirstLogin: boolean;
  hasLoggedInBefore: boolean;
}

export class Auth extends Entity<IAuthProps> {
  unmarshall(): IAuthProps {
    return { ...this._props };
  }

  static create(props: IAuthProps): Auth {
    return new Auth(props);
  }
}
