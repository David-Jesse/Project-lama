import mongoose, {Connection} from "mongoose";

let cachedConnection: Connection | null = null

export async function connectToMongoDB() {
    if (cachedConnection) {
        console.log("Using cached db connection")
        return cachedConnection;
    }
    try {
        const cnx = await mongoose.connect(process.env.MONGODB_URI as string)
        // Cached connection for future use
        cachedConnection = cnx.connection
        // log message indicating a new MongoDb connection
        console.log("New mongodb connection established")
        return cachedConnection;
    } catch(error) {
        console.log(error)
        throw error;
    }
}
