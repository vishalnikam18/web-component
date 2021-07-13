
// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'evaluation-system';

 function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypt = cipher.update(text,'utf8','hex')
  crypt += cipher.final('hex');
  return crypt;
}
 
 function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var decrypt = decipher.update(text,'hex','utf8')
  decrypt += decipher.final('utf8');
  return decrypt;
}
 module.exports = {
    encrypt,
    decrypt
};
