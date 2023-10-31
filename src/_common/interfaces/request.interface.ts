import { Request } from 'express';

export interface RequestInterface extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    tel: string;
    address: string;
    subAddress: string;
    profileImage: string;
    Roles: boolean;
  };
  cookies: {
    [key: string]: string;
  };
}
