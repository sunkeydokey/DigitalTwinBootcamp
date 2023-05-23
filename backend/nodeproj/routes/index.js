const express = require('express');
const logger = require('../lib/logger');
const departmentRouter = require('./department');
const userRouter = require('./user');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// logTest
router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});

router.get('/today', (req, res, next) => {
  const today = new Date();
  logger.info(
    `${today.getFullYear()}년 ${today.getMonth()}월 ${today.getDate()}일`
  );

  res.send(
    `${today.getFullYear()}년 ${today.getMonth()}월 ${today.getDate()}일`
  );
});

router.get('/plus', (req, res, next) => {
  const params = {
    numA: Number(req.query.numA),
    numB: Number(req.query.numB),
  };
  const result = params.numA + params.numB;
  logger.info(JSON.stringify({ numA: params.numA, numB: params.numB, result }));
  res.send(result.toString());
});

router.use('/departments', departmentRouter);
router.use('/users', userRouter);

module.exports = router;
