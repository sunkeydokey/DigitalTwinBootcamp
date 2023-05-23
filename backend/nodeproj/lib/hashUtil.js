const crypto = require('crypto');

const iterations = 1005;

const hashUtil = {
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt
      const salt = crypto.randomBytes(64).toString('base64');

      // 2. hash 생성
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        64,
        'sha256',
        (err, derivedkey) => {
          if (err) throw err;

          const hash = derivedkey.toString('hex');

          // 최종 패스워드 (password = salt, hash)
          const encryptedPassword = `${salt}.${hash}`;

          resolve(encryptedPassword);
        }
      );
    });
  },

  // 비밀번호 확인
  checkPasswordHash(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      if (!password || !encryptedPassword) {
        reject(new Error('Not allowed null (password, encryptedPassword)'));
      }

      // slat, hash 분리
      const [salt, encryptedHash] = encryptedPassword.split('.');

      // 입력된 password로부터 hash 생성
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        64,
        'sha256',
        (err, derivedkey) => {
          if (err) throw err;

          const hash = derivedkey.toString('hex');

          // 생성된 hash와 db에 저장된 hash 비교
          if (hash === encryptedHash) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  },
};
module.exports = hashUtil;
