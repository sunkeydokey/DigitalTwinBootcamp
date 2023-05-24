const logger = require('../lib/logger');
const commentDao = require('../dao/commentDao');

const service = {
  // post 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await commentDao.insert(params);
      logger.debug(`(commentService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(commentService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  async list(params) {
    let result = null;

    try {
      result = await commentDao.selectList(params);
      logger.debug(`(commentService.reg) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // selectInfo
  async info(params) {
    let result = null;

    try {
      // 댓글 상세조회
      result = await commentDao.selectInfo(params);
      logger.debug(`(commentService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // update
  async edit(params) {
    let result = null;

    try {
      result = await commentDao.update(params);
      logger.debug(`(commentService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await commentDao.delete(params);
      logger.debug(`(commentService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.delete) ${err.toString()}`);
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
