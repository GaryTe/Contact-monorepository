export enum State {
  Draft = 'Черновик',
  Published = 'Опубликовано',
  Repost = "Репост"
}

export enum TypePublication {
  Video = 'видео',
  Text = 'текст',
  Quote = 'цитата',
  Photo = 'фото',
  Link = 'ссылка'
}

export enum Counter {
  Twenty = 20,
  TwentyFive = 25,
  Fifty = 50,
  Zero = 0
};

export enum Sort {
  Like = 'like',
  Comment = 'comment'
}

export enum Tag {
  TagsList = 8,
  MinTagLength = 3,
  MaxTagLength = 10,
  Space = ' '
}
