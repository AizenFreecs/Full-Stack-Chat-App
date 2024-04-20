import mongoose from "mongoose"


const connectDB = async (uri) => {
    try {
        const connectionInstance = await mongoose.connect(uri, { dbName: "ChatApp" })
        console.log(` \nMongoDb database connected :: DBHOST :: ${connectionInstance.connection.host}`)
    } catch (error) {
        throw error
    }
}

export {connectDB}