export type DataQuote = {
  name: string;
  text: string;
  tags?: string[];
  state?: string;
  idUser: string;
}

export type DataQueryQuote = {
  idQuote: string;
  idUser: string;
}
