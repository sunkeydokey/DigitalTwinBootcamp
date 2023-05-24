const express = require('express');

const departmentRouter = require('./department');
const userRouter = require('./user');
const boardRouter = require('./board');
const postRouter = require('./post');
const commentRouter = require('./comment');
const uploadRouter = require('./upload');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/departments', departmentRouter);
router.use('/users', userRouter);
router.use('/boards', boardRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/uploads', uploadRouter);

module.exports = router;
