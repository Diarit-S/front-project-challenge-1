export interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  signin: (user: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

export enum UserRole {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
  USER = 'USER'
}
