export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongoDb: process.env.MONGODB_CONNECTION_STRING,
  port: process.env.APPLICATION_PORT || 3000,
  globalPrefix: process.env.API_GLOBAL_PREFIX ?? 'api',
  apiBaseUrl: process.env.API_BASE_URL,
  defaultLimit: process.env.DEFAULT_LIMIT || 10,
  defaultOffset: process.env.DEFAULT_OFFSET || 10,
  defaultSeedLimit: process.env.DEFAULT_SEED_LIMIT || 100,
});
