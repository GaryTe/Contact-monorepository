export type DataLink = {
  link: string;
  description?: string;
  tags?: string[];
  state?: string;
  idUser: string;
}

export type DataQueryLink = {
  idLink: string;
  idUser: string;
}
