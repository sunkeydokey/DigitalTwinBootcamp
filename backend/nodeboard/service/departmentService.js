const logger = require('../lib/logger');
const departmentDao = require('../dao/departmentDao');

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await departmentDao.insert(params);
      logger.debug(`(departmentService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(departmentService.reg) ${err.toString()}`);
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
      result = await departmentDao.selectList(params);
      logger.debug(`(departmentService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.list) ${err.toString()}`);
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
      result = await departmentDao.selectInfo(params);
      logger.debug(`(departmentService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.info) ${err.toString()}`);
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
      result = await departmentDao.update(params);
      logger.debug(`(departmentService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.edit) ${err.toString()}`);
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
      result = await departmentDao.delete(params);
      logger.debug(`(departmentService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.delete) ${err.toString()}`);
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
