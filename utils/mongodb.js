import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("DB ACTIVE");
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, options)
      .then((mongoose) => {
        console.log("DB CONNECTED");
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

async function dbDisconnect() {
  await mongoose.disconnect();
  console.log("DB DISCONNECTED");
}

const mongodb = {
  dbConnect,
  dbDisconnect,
};

export default mongodb;
