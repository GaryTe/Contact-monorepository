import {DataPhoto} from '@project/typs';

export class BlogPhotoEntity {
  private photo: string;
  private tags?: string[];
  private state?: string;
  private idUser: string;

  constructor(data: DataPhoto) {
    this.populate(data);
  }

  private populate(data: DataPhoto): void {
    this.photo = data.photo;
    this.tags = data.tags;
    this.state = data.state;
    this.idUser = data.idUser;
  }

  public get getDataPhoto(): DataPhoto {
    return ({
      photo: this.photo,
      tags: this.tags,
      state: this.state,
      idUser: this.idUser
    })
  }
}
