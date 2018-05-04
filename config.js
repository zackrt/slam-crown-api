exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://slamcrownadmin:2018reactor@ds263639.mlab.com:63639/slamcrownusers';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/users';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
module.exports = {
    PORT: process.env.PORT || 8080,
    // other stuff
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
      "http://localhost:3000/api"
  };