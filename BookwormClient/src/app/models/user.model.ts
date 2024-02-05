export class UserModel {
    firstName: string = "";
    lastName: string = "";
    passwordConfirmed: string = "";
    id: number = 0;
    userName: string = "";
    normalizedUserName: string | null = null;
    email: string = "";
    normalizedEmail: string | null = null;
    emailConfirmed: boolean = true;
    passwordHash: string = "";
    securityStamp: string | null = null;
    concurrencyStamp: string = "";
    phoneNumber: string | null = null;
    phoneNumberConfirmed: boolean = false;
    twoFactorEnabled: boolean = false;
    lockoutEnd: string | null = null;
    lockoutEnabled: boolean = false;
    accessFailedCount: number = 0;
}