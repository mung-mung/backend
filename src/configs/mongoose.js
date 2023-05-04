import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log("❌ DB Error", error);

connection.on("error", handleError);
connection.once("open", handleOpen);
