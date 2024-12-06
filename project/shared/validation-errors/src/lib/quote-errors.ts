export const quoteName = {
  isString: 'The name field is not valid. Type string.',
  isLength: 'The name field is not valid. Min length 3, max length 50'
}

export const quoteText = {
  isString: 'The text field is not valid. Type string.',
  isLength: 'The text field is not valid. Min length 20, max length 300'
}

export const quoteTags = {
  isTagsList: 'The tags field is not valid. Max list tags 8.',
  isSpace: 'The tags field is not valid. Cann not contain spaces.',
  isLetter: 'The tags field is not valid. Starts with a letter.',
  isLength: 'The tags field is not valid. Min length 3, max length 10'
}

export const quoteState = 'The state field is not valid. The value may be Черновик or Опубликовано.'

export const idQuote = 'The idQuote parameter is not valid. Enter the quote id.'
