import mongoose from "mongoose"

const connectToMongoDb = async () => {
    try {
     await mongoose.connect(process.env.MONGO_DB_URL)   
     console.log('Connected to mongodb database')
    } catch (error) {
        console.log("Error while connecting to MongoDb", error.message)
    }
}


export default connectToMongoDb