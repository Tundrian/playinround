const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB

// to resolve TS redeclaring error for importing mongoose: https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
export {};