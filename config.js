exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://slamcrownadmin:2018reactor@ds015325.mlab.com:15325/zackrt-mongodb-mlab';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/users';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';