export type User = {
  id: number;
  nickname: string;
  password: string;
  email: string;
  balance: number;
  create_timestamp: Date;
  cloak_unlock: boolean;
  hd_skin_unlock: boolean;
  is_admin: boolean;
  ban: boolean;
};
