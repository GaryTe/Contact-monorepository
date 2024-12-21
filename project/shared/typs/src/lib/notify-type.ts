export type DataPublication = {
  subscriber: {
    name: string;
    email: string;
  },
  publication: {
    id: number;
    additional: {
      name: string;
      link: string;
      tags: string;
      state: string;
      dataCreation: Date;
      dataPublication: Date;
      author: {
        id: string;
        name: string;
        email: string;
      };
      comments: number;
      likes: number;
    }
    }
}
