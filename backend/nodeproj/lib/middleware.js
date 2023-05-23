const tokenUtil = require('./tokenUtil');
const logger = require('./logger');

const middleware = {
  isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.token;

    if (token) {
      const decoded = tokenUtil.verifyToken(token);

      if (decoded) {
        const newToken = tokenUtil.makeToken(decoded);
        res.set('token', newToken);

        next();
      } else {
        // token 검증 실패시 401에러
        const err = new Error('디코딩된 토큰 정보가 없습니다.');
        logger.error(err.toString());

        res.status(401).json({ err: err.toString() });
      }
    } else {
      const err = new Error('토큰이 없습니다.');
      logger.error(err.toString());

      res.status(401).json({ err: err.toString() });
    }
  },
};

module.exports = middleware;
