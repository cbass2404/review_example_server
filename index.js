require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./services/passport");
require("./models/User");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
