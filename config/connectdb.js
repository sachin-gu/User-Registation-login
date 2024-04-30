import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            DbName: "userAuthontication"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log("Database Connected Successfully")
        } catch (error) {
            console.log(error);
        }

}

export default connectDb;
