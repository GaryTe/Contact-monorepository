export enum RabbitRouting {
  AddSubscriber = 'notify.addSubscriber',
  AddUser = 'notify.user',
  AddPublication = 'notify.publication'
}

export enum Exchange {
  ReadmeNotify = 'readme.notify',
  ReadmePublication = 'readme.publication',
  ReadmeUser = 'readme.user',
}

export enum Queue {
  ReadmeNotify = 'readme.notify',
  ReadmePublication = 'readme.publication',
  ReadmeUser = 'readme.user',
}
