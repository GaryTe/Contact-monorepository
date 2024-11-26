import {Expose, Transform, Type} from 'class-transformer';

class AdditionalData {
  @Expose()
  public idUser: string;

  @Expose()
  public name: string;

  @Expose()
  public link: string;

  @Expose()
  @Transform(({value}) => value ? value.split(',') : value)
  public tags: string[];

  @Expose()
  public state: string;

  @Expose()
  public dataCreation: Date;

  @Expose()
  public dataPublication: Date;
}


export class VideoRdo {
  @Expose()
  public id: number;

  @Expose()
  @Type(() => AdditionalData)
  public additional: AdditionalData;

  @Expose()
  @Transform(({value}) => value.length)
  public comments: number;
}
