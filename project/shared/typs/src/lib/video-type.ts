export type DataVideo = {
  name: string;
  link: string;
  tags?: string[];
  state?: string;
  idUser: string;
}

export type AdditionalData = {
  idUser: string;
  name: string | null;
  link: string | null;
  tags: string | null;
  state: string;
  repost: string | null;
  originalIdUser: string | null;
  originalIdPublication: string | null;
  dataCreation: Date;
  dataPublication: Date;
}

export type Comment = {
  text: string;
  idUser: string;
  dataCreation: Date;
}

export type Publication = {
  preview: string | null;
  text: string | null;
  photo: string | null;
  description: string | null;
  additional: AdditionalData;
  comments: Comment[]
}

export type DataQueryVideo = {
  idVideo: string;
  idUser: string;
}
