import {DataQuote} from '@project/typs';

export class BlogQuoteEntity {
  private text: string;
  private name: string;
  private tags?: string[];
  private state?: string;
  private idUser: string;

  constructor(data: DataQuote) {
    this.populate(data);
  }

  private populate(data: DataQuote): void {
    this.text = data.text;
    this.name = data.name;
    this.tags = data.tags;
    this.state = data.state;
    this.idUser = data.idUser;
  }

  public get getDataQuote(): DataQuote {
    return ({
      text: this.text,
      name: this.name,
      tags: this.tags,
      state: this.state,
      idUser: this.idUser
    })
  }
}
