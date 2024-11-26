import {DataLink} from '@project/typs';

export class BlogLinkEntity {
  private link: string;
  private description: string;
  private tags?: string[];
  private state?: string;
  private idUser: string;

  constructor(data: DataLink) {
    this.populate(data);
  }

  private populate(data: DataLink): void {
    this.link = data.link;
    this.description = data.description;
    this.tags = data.tags;
    this.state = data.state;
    this.idUser = data.idUser;
  }

  public get getDataLink(): DataLink {
    return ({
      link: this.link,
      description: this.description,
      tags: this.tags,
      state: this.state,
      idUser: this.idUser
    })
  }
}
