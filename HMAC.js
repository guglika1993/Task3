const crypto = require('crypto');

class HMAC {

  generateRandomKey(length) {
    const lengthInBytes = Math.ceil(length / 8);
    return crypto.randomBytes(lengthInBytes);
  }

  calculateHMAC(key, data) {
    const hmac = crypto.createHmac('sha3-256', key);
    hmac.update(data);
    return hmac.digest('hex');
  }

  checkHMAC(pcMove, hmac, key){
    const giveMeHMAC = crypto.createHmac('sha3-256', key).update(pcMove).digest('hex');
    const valid = crypto.timingSafeEqual(Buffer.from(giveMeHMAC, 'hex'), Buffer.from(hmac, 'hex'));
    return valid;
}
  //method above checks if computer "cheats"
}

module.exports = HMAC;
