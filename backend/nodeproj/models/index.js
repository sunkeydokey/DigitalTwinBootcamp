const { sequelize } = require('./connection');
const Department = require('./department');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Department = Department;

// model init
Department.init(sequelize);

module.exports = db;
