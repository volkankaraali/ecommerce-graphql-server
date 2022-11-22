const jwt = require('jsonwebtoken');

const token = {
  generete: ({id, email }, expiresIn) => {
    return jwt.sign(
      {
        id,
        email
      },
      process.env.SECRET_KEY,
      { expiresIn }
    );
  },
  decode: token => {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
};

module.exports = token;