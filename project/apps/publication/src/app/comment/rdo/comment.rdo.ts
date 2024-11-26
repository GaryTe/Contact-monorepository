import {Expose} from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id: number;

  @Expose()
  public text: string;

  @Expose()
  public idUser: string;

  @Expose()
  public dataCreation: Date;

  @Expose()
  public publicationId: number;
}
