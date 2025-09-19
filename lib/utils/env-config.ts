const _config = {
  mongoDb: process.env.MONGODB_URI as string,
  dbName: process.env.DATABASE as string,
  saltRounds: parseInt(process.env.SALT_ROUNDS || "10", 10),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION || "1h",
  NODE_ENV: process.env.NODE_ENV || "development",
};
export const config = Object.freeze(_config);
