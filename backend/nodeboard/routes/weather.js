const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const weatherUtil = require('../lib/weatherUtil');

// 리스트 조회
router.post('/', async (req, res) => {
  try {
    const params = {
      numOfRows: req.body.numOfRows,
      pageNo: req.body.pageNo,
      dataType: req.body.dataType,
      base_date: req.body.base_date,
      base_time: req.body.base_time,
      nx: req.body.nx,
      ny: req.body.ny,
      lat: req.body.lat,
      lng: req.body.lng,
    };
    logger.info(`(weather.get.params) ${JSON.stringify(params)}`);

    const result = await weatherUtil.getData(params);
    logger.info(`(weather.get.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
