export interface UserCredentials {
  userName: string;
  password: string;
}

export interface User extends UserCredentials {
  avatar: string;
  friends: Users;
  enemies: Users;
  token: string;
}

type Users = User[];
