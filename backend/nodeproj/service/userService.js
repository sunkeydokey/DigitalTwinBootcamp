const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const hashUtil = require('../lib/hashUtil');

const service = {
  // user 입력
  async reg(params) {
    let inserted = null;

    let hashPassword = null;

    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
    } catch (err) {
      logger.error(`(userService.reg - hashPassowrd) ${err.toString()}`);
    }

    const newParams = { ...params, password: hashPassword };

    try {
      inserted = await userDao.insert(newParams);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await userDao.selectList(params);
      logger.debug(`(userService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await userDao.selectInfo(params);
      logger.debug(`(userService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async login(params) {
    // 1. userid로 사용자 조회
    let user = null;
    try {
      user = await userDao.selectUser(params);
      logger.debug(`(userService.login) ${JSON.stringify(user)}`);

      // 2. 패스워드 일치여부 비교
      if (!user) {
        const err = new Error('Incorrect userid or password');
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      logger.error(`(userService.login) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 3. 패스워드 일치시 토큰 발급
    try {
      const checkPassword = await hashUtil.checkPasswordHash(
        params.password,
        user.password
      );
      logger.debug(`(userService.checkPassword) ${checkPassword}`);

      // 패스워드 불일치 에러 처리
      if (!checkPassword) {
        const err = new Error('Incorrect userid or password');
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      logger.error(`(userService.checkPassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(user);
    });
  },

  // update
  async edit(params) {
    let result = null;

    try {
      result = await userDao.update(params);
      logger.debug(`(user.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(user.edit) ${err.toString()}`);
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await userDao.delete(params);
      logger.debug(`(user.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(user.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
