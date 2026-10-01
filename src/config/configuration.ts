export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT ?? '', 10) || 4002,
  secret: process.env.SECRET || 'default-secret',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME || 'spotify-clone',
});
