import dotenv from 'dotenv';
dotenv.config();
const config = {
    dev: process.env.ENV !== 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    publicApiKeysToken: process.env.PUBLIC_API_KEYS_TOKEN,
    adminApiKeysToken: process.env.ADMIN_API_KEYS_TOKEN

}

export default config;