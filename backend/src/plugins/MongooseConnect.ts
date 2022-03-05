import mongoose from "mongoose";

import config from "../config";

const MongooseConnectPlugin = {
  async serverWillStart() {
    mongoose.connection.on("connected", () => {
      console.info(
        `Connection Establised: MongoDB Server at uri: ${config.db_config.uri}`,
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.error(
        `Connection Terminated: MongoDB Server at uri: ${config.db_config.uri}`,
      );
    });

    await mongoose.connect(config.db_config.uri, {
      dbName: config.db_config.dbname,
      user: config.db_config.user,
      pass: config.db_config.password,
    });
  }
};

export default MongooseConnectPlugin;