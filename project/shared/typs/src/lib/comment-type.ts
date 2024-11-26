export type DataComment = {
  text: string;
  idPublication: number;
  idUser: string;
}

export type DataQueryComment = {
  idComment: string;
  idUser: string;
}

export type DetailInformationComment = {
  id: number;
  text: string;
  idUser: string;
  dataCreation: Date;
  publicationId: number;
}
