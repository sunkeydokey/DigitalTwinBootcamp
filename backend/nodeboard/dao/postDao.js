const { Op } = require('sequelize');
const { Board, User, Post, Department } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Post.create(params)
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

    if (params.content) {
      setQuery.where = {
        ...setQuery.where,
        content: { [Op.like]: `%${params.content}%` }, // like검색
      };
    }

    if (params.UserIds) {
      setQuery.where = {
        ...setQuery.where,
        UserId: params.UserIds, // like검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Post.findAndCountAll({
        ...setQuery,
        // attributes: ['id', 'name', 'code'],
        include: [
          {
            model: User,
            as: 'Board',
            attributes: User.includeAttribues,
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
      Post.findByPk(params.id, {
        inclued: [
          {
            model: Board,
            as: 'Board',
            attributes: Board.includeAttribues,
          },
          {
            model: User,
            as: 'User',
            attributes: User.includeAttributes,
            include: [
              {
                model: Department,
                as: 'Department',
                attributes: Department.includeAttribues,
              },
            ],
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
      Post.update(params, {
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
      Post.destroy({
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
