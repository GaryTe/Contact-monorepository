import {Expose, Transform, Type} from 'class-transformer';

class AdditionalData {
  @Expose()
  public idUser: string;

  @Expose()
  public author: {
    id: string,
    name: string,
    email: string,
    avatar: string
  };

  @Expose()
  @Transform(({value}) => value ? value.split(',') : value)
  public tags: string[];

  @Expose()
  public state: string;

  @Expose()
  public repost: string;

  @Expose()
  public originalIdUser: string;

  @Expose()
  public originalIdPublication: string;

  @Expose()
  public dataCreation: Date;

  @Expose()
  public dataPublication: Date;
}


export class DetailInformationRdo {
  @Expose()
  public id: number;

  @Expose()
  public photo: string;

  @Expose()
  @Type(() => AdditionalData)
  public additional: AdditionalData;

  @Expose()
  @Transform(({value}) => value.length)
  public comments: number;

  @Expose()
  @Transform(({value}) => value.length)
  public likes: number;
}
