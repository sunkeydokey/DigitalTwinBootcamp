const { Op } = require('sequelize');
const { Department } = require('../models');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Department.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 리스트 조회
  selectList(params) {
    const setQuery = {};
    if (params.id) {
      setQuery.where = {
        ...setQuery.where,
        id: params.id, // '=' 검색
        // id: { [Op.in]: `%${params.id}` }, in 검색
      };
    }
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like 검색
      };
    }
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      Department.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['description'] },
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Department.findByPk(params.id)
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Department.update(params, {
        where: { id: params.id },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Department.destroy({
        where: { id: params.id },
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
