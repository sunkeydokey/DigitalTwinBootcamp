const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const logger = require('../lib/logger');
const { isLoggedIn } = require('../lib/middleware');

const uploadDir = 'uploads';

// 저장할 디렉토리 유무 확인 및 없을 경우 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 저장 경로 지정
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 파일명을 설정하는 부분
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// 등록
router.post('/', isLoggedIn, upload.single('file'), async (req, res) => {
  try {
    logger.info(req.file.path);
    if (!req.file) {
      const err = new Error('파일 업로드에 실패했습니다.');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    const result = {
      originalName: req.file,
      path: req.file.path,
    };
    logger.info(`(upload.result) ${JSON.stringify(result)}`);
    res.status(200).json(result);

    // 최종 응답
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
