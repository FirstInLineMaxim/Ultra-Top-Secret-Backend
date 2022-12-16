const bcrypt = require("bcrypt");
const saltRounds = 10;


//Crypts password as middelware and calls next
async function cryptPassword(req, res, next) {
    const {password}= req.body
    await bcrypt.genSalt(saltRounds,function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
             req.body.password = hash
             next()
            });
          });
        
    }


//Compares password and return either true or false and calls next
async function comparePassword(req, res, next) {
  const {password,hash}=req.body
  await bcrypt.compare(password, hash, function (err, result) {
    // result == true
    req.body.valid = result
    next()
  });
}

module.exports = { cryptPassword, comparePassword };
