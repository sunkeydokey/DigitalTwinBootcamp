const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        departmentId: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(100),
        },
        userid: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
          comment: 'hash 암호 적용',
        },
        role: {
          type: Sequelize.STRING(20),
          comment: 'staff',
        },
        email: {
          type: Sequelize.STRING(255),
        },
        phone: {
          type: Sequelize.STRING(255),
        },
        updatedPwDate: {
          type: Sequelize.DATE,
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

  static associate(db) {
    db.User.belongsTo(db.Department, {
      foreignKey: {
        name: 'departmentId',
        onDelete: 'SET NULL',
        as: 'Department',
      },
    });
  }
};
