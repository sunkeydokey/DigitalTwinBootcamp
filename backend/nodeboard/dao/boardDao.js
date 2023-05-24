const { Op } = require('sequelize');
const { Board, User, Post } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Board.create(params)
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
    // where 검색 조건
    const setQuery = {};
    if (params.title) {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.like]: `%${params.title}%` }, // like검색
      };
    }
    if (params.active) {
      setQuery.where = {
        ...setQuery.where,
        active: params.active, // '=' 검색
      };
    }
    if (params.userIds) {
      setQuery.where = {
        ...setQuery.where,
        userId: params.userIds, // 'in' 검색
      };
    }
    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Board.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'role', 'email'],
          },
        ],
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
      Board.findByPk(params.id, {
        include: [
          {
            model: Post,
            as: 'Posts',
            attributes: ['id', 'title', 'userId', 'createdAt'],
            include: [
              {
                model: User,
                as: 'User',
                attributes: ['id', 'name', 'role', 'email', 'phone'],
              },
            ],
          },
          {
            model: User,
            as: 'User',
            attributes: ['id', 'name', 'role', 'email', 'phone'],
          },
        ],
      })
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Board.update(params, {
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
      Board.destroy({
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
