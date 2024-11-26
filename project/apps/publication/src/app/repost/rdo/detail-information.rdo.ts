import {Expose, Transform, Type} from 'class-transformer';

class AdditionalData {
  @Expose()
  public idUser: string;

  @Transform(({value, obj}) => value ?? obj.key)
  @Expose()
  public name: string;

  @Transform(({value, obj}) => value ?? obj.key)
  @Expose()
  public link: string;

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

  @Transform(({value, obj}) => value ?? obj.key)
  @Expose()
  public preview: string;

  @Transform(({value, obj}) => value ?? obj.key)
  @Expose()
  public text: string;

  @Transform(({value, obj}) => value ?? obj.key)
  @Expose()
  public photo: string;

  @Transform(({value, obj}) => value ?? obj.key)
  @Expose()
  public description: string;

  @Expose()
  @Type(() => AdditionalData)
  public additional: AdditionalData;

  @Expose()
  @Transform(({value}) => value.length)
  public comments: number;
}
