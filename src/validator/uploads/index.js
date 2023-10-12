const InvariantError = require('../../exceptions/InvariantError');
const { ImageHeadersSchema } = require('./schema');

const UploadsValidator = {
  validateImageHeaders: (header) => {
    const { error } = ImageHeadersSchema.validate(header);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = UploadsValidator;
