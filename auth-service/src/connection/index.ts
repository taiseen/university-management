import mongoose from 'mongoose';
import config from '../config';
import app from '../app';

const dbConnection = async () => {
  try {
    const { port, dbURL } = config;

    await mongoose.connect(dbURL as string);

    app.listen(port, () =>
      console.log(
        `Server start on Port :${port} \nConnected To MongoDB ==> OK ✅`
      )
    );
  } catch (error) {
    console.error(error);
  }
};

dbConnection();
