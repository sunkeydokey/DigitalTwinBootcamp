const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT;

const options = {
  expiresIn: '8h',
};

const tokenUtil = {
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
