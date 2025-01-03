import {Expose} from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public avatar?: string;

  @Expose({name: 'createdAt'})
  public dateRegistration: string;

  @Expose()
  public numberOfPublication: number;

  @Expose()
  public numberOfSubscriber: number;
}
