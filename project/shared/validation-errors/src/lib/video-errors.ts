export const videoName = {
  isString: 'The name field is not valid. Type string.',
  isLength: 'The name field is not valid. Min length 20, max length 50'
}

export const videoLink = {
  isString: 'The link field is not valid. Type string.',
  value: 'The link field is not valid. Value is a valid YouTube link.'
}

export const videoTags = {
  isTagsList: 'The tags field is not valid. Max list tags 8.',
  isSpace: 'The tags field is not valid. Cann not contain spaces.',
  isLetter: 'The tags field is not valid. Starts with a letter.',
  isLength: 'The tags field is not valid. Min length 3, max length 10'
}

export const videoState = 'The state field is not valid. The value may be Черновик or Опубликовано.'

export const idVideo = 'The idVideo parameter is not valid. Enter the video id.'
