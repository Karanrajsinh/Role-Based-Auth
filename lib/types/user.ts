export type Role = 'ADMIN' | 'GUEST';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}