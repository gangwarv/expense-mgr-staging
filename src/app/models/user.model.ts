export interface IUser {
  uid: string;
  displayName: string;
  photoUrl?: string;
  email?: string;

  loading?: boolean;
  error?: string;
}

export class User implements IUser {
  constructor(
    public uid: string,
    public displayName: string,
    public photoUrl?: string,
    public email?: string
  ) {}
}
