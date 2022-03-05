interface DbConfig {
  uri: string;
  user?: string;
  password?: string;
  dbname?: string;
}

interface Config {
  db_config: DbConfig;
};

const config: Config = {
  db_config: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/",
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    dbname: process.env.MONGODB_DBNAME,
  }
};

export default config;