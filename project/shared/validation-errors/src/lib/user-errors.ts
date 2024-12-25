export const email = 'The email field is not valid. Enter a correct email.'

export const name = {
  isString: 'The name field is not valid. Type string.',
  isLength: 'The name field is not valid. Min length 3, max length 50',
  value: 'The name field is not valid. Indicate your first and last name. Exammple: Alex Murashov'
}

export const password = {
  isLength: 'The password field is not valid.  Min length 6, max length 12.',
  isString: 'The password field is not valid. Type string.'
}

export const idUser = {
  isString: 'The idUser parameter is not valid. Type string.',
  validate: 'The idUser parameter is not valid. Bad entity ID'
}

export const query = {
  oldPassword: {
    isLength: 'The oldPassword parameter is not valid.  Min length 6, max length 12.',
    isString: 'The oldPassword parameter is not valid. Type string.'
  },
  newPassword: {
    isLength: 'The newPassword parameter is not valid.  Min length 6, max length 12.',
    isString: 'The newPassword parameter is not valid. Type string.'
  }
}

export const avatar = {
  size: 'File size is greater than 500 Kb',
  extension: 'File extension does not match jpeg, png'
}
