export interface UserInterface {
  setPassword(password: string): string;
  comparePassword(password: string): boolean
}
