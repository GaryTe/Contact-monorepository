import {DataVideo} from '@project/typs';

export class BlogVideoEntity {
  private name: string;
  private link: string;
  private tags?: string[];
  private state?: string;
  private idUser: string;

  constructor(data: DataVideo) {
    this.populate(data);
  }

  private populate(data: DataVideo): void {
    this.name = data.name;
    this.link = data.link;
    this.tags = data.tags;
    this.state = data.state;
    this.idUser = data.idUser;
  }

  public get getDataVideo(): DataVideo {
    return ({
      name: this.name,
      link: this.link,
      tags: this.tags,
      state: this.state,
      idUser: this.idUser,
    })
  }
}
