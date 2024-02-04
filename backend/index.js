const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const rootRouter = require("./routes");

const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter)
app.get("/", (req, res) => {
    res.status(200).json({ message: "Paytm server is running" })
})

connectDB();
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})