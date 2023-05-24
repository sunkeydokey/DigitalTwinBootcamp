const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        // tableName: 'tableName', // table명을 수동으로 생성 함
        // freezeTableName: true, // true: table명의 복수형 변환을 막음
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: true, // deletedAt
      }
    );
  }

  // onDelete: 'CASCADE' department데이터삭제시 연결된 user의 정보도 삭제
  // onDelete: 'SET NULL' department데이터삭제시 연결된 user의 departmentId를 NULL값으로 삭제
  static associate(db) {
    db.Comment.belongsTo(db.Post, {
      foreignKey: { name: 'postId', onDelete: 'SET NULL', as: 'Post' },
    });
    db.Comment.belongsTo(db.User, {
      foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' },
    });
  }

  static includeAttributes = ['id', 'content', 'userId', 'createdAt'];
};
