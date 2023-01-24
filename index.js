const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,  Accept"
    );
    res.setHeader('Content-Type', 'application/json')
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
// Connect DB
mongoose
  .connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());
// Route
app.use("/dphi", require("./routes/dphi"));
app.get('/', (req, res) => {
  res.send('Welcome  to DPhi !!!')
})


app.listen(process.env.PORT || 3000, () => {
  console.log("App is running")
});
