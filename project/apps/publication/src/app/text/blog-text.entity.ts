import {DataText} from '@project/typs';

export class BlogTextEntity {
  private name: string;
  private preview: string;
  private text: string;
  private tags?: string[];
  private state?: string;
  private idUser: string;

  constructor(data: DataText) {
    this.populate(data);
  }

  private populate(data: DataText): void {
    this.name = data.name;
    this.preview = data.preview;
    this.text = data.text;
    this.tags = data.tags;
    this.state = data.state;
    this.idUser = data.idUser;
  }

  public get getDataText(): DataText {
    return ({
      name: this.name,
      preview: this.preview,
      text: this.text,
      tags: this.tags,
      state: this.state,
      idUser: this.idUser
    })
  }
}
