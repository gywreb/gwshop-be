const mongoose = require("mongoose");

class ConnectMongoDB {
  static getConnection() {
    if (!mongoose.connection.readyState) {
      mongoose
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        })
        .then(() => console.log(`DB is connected`.yellow))
        .catch((err) => console.log(`DB failed to connect error: ${err}`.red));
    }
  }
}

module.exports = ConnectMongoDB;
