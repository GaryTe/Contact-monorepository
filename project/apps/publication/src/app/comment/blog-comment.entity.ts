import {DataComment} from '@project/typs';

export class BlogCommentEntity {
  private text: string;
  private idPublication: number;
  public idUser: string;

  constructor(data: DataComment) {
    this.populate(data);
  }

  private populate(data: DataComment): void {
    this.text = data.text;
    this.idPublication = data.idPublication;
    this.idUser = data.idUser;
  }

  public get getDataComment(): DataComment {
    return ({
      text: this.text,
      idPublication: this.idPublication,
      idUser: this.idUser
    })
  }
}
