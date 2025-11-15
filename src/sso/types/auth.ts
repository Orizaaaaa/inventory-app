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
