export interface IResetPasswordDto {
  userId?: string;
  newPassword: string;
  oldPassword: string;
}
